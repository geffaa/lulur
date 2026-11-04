<?php

namespace App\Support\Gateway;

use App\Models\Payment;

/**
 * Adapters behind one interface: Stripe (USD, saved cards, off-session
 * no-show fees) and Midtrans/Xendit (IDR QRIS/VA). In sandbox mode the
 * routes funnel into LulurPayGateway so the demo runs without keys.
 */
interface PaymentGateway
{
    /** Start a payment; returns the payload the booking flow redirects to. */
    public function start(Payment $payment): array;

    /** Human-facing gateway name for receipts. */
    public function label(): string;
}
