<?php

namespace App\Services;

use App\Enums\BookingStatus;
use App\Events\BookingChanged;
use App\Models\Booking;
use App\Models\Client;
use App\Models\GiftCard;
use App\Models\GiftCardLedger;
use App\Models\Payment;
use App\Models\Tip;
use App\Support\Gateway\LulurPayGateway;
use App\Support\Gateway\MidtransGateway;
use App\Support\Gateway\PaymentGateway;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentService
{
    public function gatewayFor(string $currency): PaymentGateway
    {
        // IDR goes to Midtrans when a server key is configured; everything else uses the built-in sandbox
        if ($currency === 'IDR' && ($key = config('services.midtrans.server_key'))) {
            return new MidtransGateway($key, (bool) config('services.midtrans.production'));
        }

        return new LulurPayGateway();
    }

    public function midtrans(): ?MidtransGateway
    {
        $gateway = $this->gatewayFor('IDR');

        return $gateway instanceof MidtransGateway ? $gateway : null;
    }

    /**
     * Apply a Midtrans notification (webhook body or status API response).
     * The signature must already be verified (webhook) or the data fetched from Midtrans itself (status API).
     * Returns 'paid' | 'failed' | 'pending' | 'unknown_order' | 'amount_mismatch'.
     */
    public function applyMidtransNotification(array $n): string
    {
        $payment = Payment::withoutGlobalScopes()->where('idempotency_key', $n['order_id'] ?? '')->first();
        if (! $payment || $payment->gateway !== 'midtrans') {
            return 'unknown_order';
        }
        // gross_amount arrives as "555000.00"
        if ((int) round((float) ($n['gross_amount'] ?? -1)) !== (int) $payment->amount) {
            return 'amount_mismatch';
        }

        $status = $n['transaction_status'] ?? '';
        $paid = $status === 'settlement' || ($status === 'capture' && ($n['fraud_status'] ?? 'accept') === 'accept');
        if ($paid) {
            $this->markSucceeded($payment->idempotency_key, $n['transaction_id'] ?? null);

            return 'paid';
        }
        if (in_array($status, ['deny', 'cancel', 'expire', 'failure'], true)) {
            if ($payment->status === 'pending') {
                $payment->update(['status' => 'failed']);
            }

            return 'failed';
        }

        return 'pending';
    }

    public function createForBooking(Booking $booking, string $kind, ?string $method = null, ?int $amount = null): Payment
    {
        $amount ??= match ($kind) {
            'deposit' => $booking->deposit_due,
            'balance' => $booking->balanceDue(),
            default => throw new \InvalidArgumentException("Amount required for $kind"),
        };

        $gateway = $this->gatewayFor($booking->tenant->currency);

        return Payment::create([
            'tenant_id' => $booking->tenant_id,
            'booking_id' => $booking->id,
            'client_id' => $booking->client_id,
            'gateway' => $booking->tenant->currency === 'IDR' ? 'midtrans' : 'stripe',
            'method' => $method,
            'kind' => $kind,
            'amount' => $amount,
            'status' => 'pending',
            'idempotency_key' => (string) Str::uuid(),
            'meta' => ['gateway_label' => $gateway->label()],
        ]);
    }

    /** Called by the provider webhook (real) or the sandbox approve button. Idempotent. */
    public function markSucceeded(string $idempotencyKey, ?string $providerRef = null): Payment
    {
        return DB::transaction(function () use ($idempotencyKey, $providerRef) {
            $payment = Payment::withoutGlobalScopes()
                ->where('idempotency_key', $idempotencyKey)
                ->lockForUpdate()
                ->firstOrFail();

            if ($payment->status === 'succeeded') {
                return $payment; // webhook replay — no-op
            }

            $payment->update([
                'status' => 'succeeded',
                'provider_ref' => $providerRef ?? 'sbx_'.Str::random(12),
                'paid_at' => now(),
            ]);

            $booking = $payment->booking()->with('items.service')->first();
            if ($booking) {
                match ($payment->kind) {
                    'deposit' => $this->applyDeposit($booking, $payment),
                    'balance' => null, // checkout: recorded, booking already completed
                    'tip' => null,
                    'no_show_fee', 'package', 'gift_card' => null,
                    default => null,
                };
            }

            return $payment;
        });
    }

    protected function applyDeposit(Booking $booking, Payment $payment): void
    {
        $booking->forceFill([
            'deposit_paid' => $booking->deposit_paid + $payment->amount,
            'status' => BookingStatus::Confirmed->value,
            'confirmed_at' => now(),
            'hold_expires_at' => null,
        ])->save();

        // saved-card consent (Juniper flow): remember the card when the policy asks
        $policy = $booking->policy_snapshot;
        if (($policy['saved_card_mode'] ?? 'optional') !== 'optional' && $payment->method === 'card' && $booking->client) {
            $booking->client->forceFill([
                'saved_card' => ['brand' => 'Visa', 'last4' => '4242', 'consent_at' => now()->toIso8601String()],
            ])->save();
        }

        app(ReminderService::class)->scheduleFor($booking);
        BookingChanged::dispatch($booking);
    }

    public function refundDeposit(Booking $booking, string $actor): Payment
    {
        return Payment::create([
            'tenant_id' => $booking->tenant_id,
            'booking_id' => $booking->id,
            'client_id' => $booking->client_id,
            'gateway' => $booking->tenant->currency === 'IDR' ? 'midtrans' : 'stripe',
            'kind' => 'refund',
            'amount' => $booking->deposit_paid,
            'status' => 'refunded',
            'idempotency_key' => (string) Str::uuid(),
            'meta' => ['actor' => $actor, 'refund_of' => 'deposit'],
            'refunded_at' => now(),
        ]);
    }

    /** Off-session charge from a saved card (no-show fee). Manager-only, audited upstream. */
    public function offSessionCharge(Booking $booking, string $kind, int $amount, string $actor): Payment
    {
        $client = $booking->client;
        abort_if(! $client || ! $client->saved_card, 422, 'No saved card on file.');

        return Payment::create([
            'tenant_id' => $booking->tenant_id,
            'booking_id' => $booking->id,
            'client_id' => $client->id,
            'gateway' => 'stripe',
            'method' => 'card',
            'kind' => $kind,
            'amount' => $amount,
            'status' => 'succeeded',
            'provider_ref' => 'off_'.Str::random(12),
            'idempotency_key' => (string) Str::uuid(),
            'meta' => ['actor' => $actor, 'off_session' => true, 'card_last4' => $client->saved_card['last4'] ?? null],
            'paid_at' => now(),
        ]);
    }

    /**
     * Front-desk checkout: balance + tip payment, tips split equally over the
     * item's therapists (override per staff allowed).
     */
    public function checkout(Booking $booking, int $tipTotal = 0, array $tipStaffIds = [], ?string $method = 'card', ?int $balanceDue = null): array
    {
        $payments = [];

        $balance = $balanceDue ?? $booking->balanceDue();
        if ($balance > 0) {
            $payments[] = $this->createForBooking($booking, 'balance', $method, $balance);
        }

        $payments[] = $payment = $this->createForBooking($booking, 'tip', $method, $tipTotal);

        DB::transaction(function () use ($payment, $booking, $tipTotal, $tipStaffIds) {
            $payment->update(['status' => 'succeeded', 'paid_at' => now(), 'provider_ref' => 'sbx_'.Str::random(12)]);

            $staffIds = $tipStaffIds ?: $booking->resources()->whereNotNull('staff_id')->distinct()->pluck('staff_id')->all();
            if ($tipTotal > 0 && count($staffIds) > 0) {
                $share = intdiv($tipTotal, count($staffIds));
                $remainder = $tipTotal - $share * count($staffIds);
                foreach (array_values($staffIds) as $i => $sid) {
                    Tip::create([
                        'tenant_id' => $booking->tenant_id,
                        'payment_id' => $payment->id,
                        'staff_id' => $sid,
                        'booking_id' => $booking->id,
                        'amount' => $share + ($i === 0 ? $remainder : 0),
                    ]);
                }
                $booking->forceFill(['tip_total' => $booking->tip_total + $tipTotal])->save();
            }
        });

        if ($balance > 0) {
            $payments[0]->update(['status' => 'succeeded', 'paid_at' => now(), 'provider_ref' => 'sbx_'.Str::random(12)]);
        }

        return $payments;
    }

    public function redeemGiftCard(Booking $booking, string $code): GiftCard
    {
        $card = GiftCard::where('code', strtoupper($code))->firstOrFail();
        abort_if($card->balance <= 0, 422, 'Gift card has no balance.');
        abort_if($card->expires_at && $card->expires_at->isPast(), 422, 'Gift card expired.');

        $amount = min($card->balance, $booking->balanceDue());

        DB::transaction(function () use ($card, $booking, $amount) {
            $newBalance = $card->balance - $amount;
            $card->update(['balance' => $newBalance]);

            GiftCardLedger::create([
                'tenant_id' => $booking->tenant_id,
                'gift_card_id' => $card->id,
                'delta' => -$amount,
                'balance_after' => $newBalance,
                'note' => 'Redeemed on booking '.$booking->code,
                'created_at' => now(),
            ]);

            $booking->forceFill(['deposit_paid' => $booking->deposit_paid + $amount])->save();
        });

        return $card;
    }
}
