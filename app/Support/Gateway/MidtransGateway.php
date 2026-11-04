<?php

namespace App\Support\Gateway;

use App\Models\Payment;
use Illuminate\Support\Facades\Http;

/**
 * Midtrans Snap (IDR). The payment's idempotency_key is the Midtrans order_id,
 * so the webhook and the status API can find the payment again.
 * Docs: https://docs.midtrans.com/reference/backend-integration
 */
class MidtransGateway implements PaymentGateway
{
    public function __construct(protected string $serverKey, protected bool $production = false)
    {
    }

    public function snapUrl(): string
    {
        return $this->production ? 'https://app.midtrans.com/snap/v1/transactions' : 'https://app.sandbox.midtrans.com/snap/v1/transactions';
    }

    public function apiUrl(): string
    {
        return $this->production ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com';
    }

    public function start(Payment $payment): array
    {
        $booking = $payment->booking()->with('client', 'tenant')->firstOrFail();
        $client = $booking->client;

        $response = Http::withBasicAuth($this->serverKey, '')
            ->acceptJson()->asJson()->timeout(20)
            ->post($this->snapUrl(), [
                'transaction_details' => [
                    'order_id' => $payment->idempotency_key,
                    'gross_amount' => (int) $payment->amount,
                ],
                'item_details' => [[
                    'id' => $booking->code,
                    'price' => (int) $payment->amount,
                    'quantity' => 1,
                    'name' => mb_substr($booking->tenant->name.' deposit '.$booking->code, 0, 50),
                ]],
                'customer_details' => array_filter([
                    'first_name' => $client?->name,
                    'email' => $client?->email,
                    'phone' => $client?->phone_e164,
                ]),
                'expiry' => ['unit' => 'minute', 'duration' => 10], // same as the slot hold
                'callbacks' => ['finish' => route('pay.return', ['payment' => $payment->id])],
            ]);

        if (! $response->successful() || ! $response->json('redirect_url')) {
            throw new \RuntimeException('Midtrans refused the transaction: '.($response->json('error_messages.0') ?? $response->status()));
        }

        $payment->update(['meta' => array_merge($payment->meta ?? [], ['snap_token' => $response->json('token')])]);

        return ['redirect' => $response->json('redirect_url'), 'method' => $payment->method, 'sandbox' => ! $this->production];
    }

    public function label(): string
    {
        return $this->production ? 'Midtrans' : 'Midtrans (sandbox)';
    }

    /** signature_key = SHA512(order_id + status_code + gross_amount + server key) */
    public function validSignature(array $n): bool
    {
        $expected = hash('sha512', ($n['order_id'] ?? '').($n['status_code'] ?? '').($n['gross_amount'] ?? '').$this->serverKey);

        return isset($n['signature_key']) && hash_equals($expected, (string) $n['signature_key']);
    }

    /** Ask Midtrans for the current status of an order (used when we cannot receive webhooks, e.g. locally). */
    public function fetchStatus(string $orderId): ?array
    {
        $response = Http::withBasicAuth($this->serverKey, '')->acceptJson()->timeout(20)
            ->get($this->apiUrl().'/v2/'.urlencode($orderId).'/status');

        return $response->successful() ? $response->json() : null;
    }
}
