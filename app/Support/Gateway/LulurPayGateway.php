<?php

namespace App\Support\Gateway;

use App\Models\Payment;

/**
 * Simulated gateway used for the demo (and as the sandbox mode of Stripe /
 * Midtrans). The "provider page" is a branded route; approving it mimics the
 * provider webhook hitting /webhooks/{gateway} with the same idempotency
 * guarantees as the real thing.
 */
class LulurPayGateway implements PaymentGateway
{
    public function start(Payment $payment): array
    {
        return [
            'redirect' => route('pay.show', ['payment' => $payment->id]),
            'method' => $payment->method,
            'sandbox' => true,
        ];
    }

    public function label(): string
    {
        return 'Lulur Pay (sandbox)';
    }
}
