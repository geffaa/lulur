<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentService;

/**
 * Where Midtrans sends the customer back. Locally (no public webhook URL) the status is
 * pulled from Midtrans here, so the booking confirms without a tunnel.
 */
class PayReturnController extends Controller
{
    public function __invoke(Payment $payment, PaymentService $payments)
    {
        $booking = $payment->booking()->firstOrFail();
        $gateway = $payments->midtrans();

        if ($gateway && $payment->status === 'pending' && ($status = $gateway->fetchStatus($payment->idempotency_key))) {
            $payments->applyMidtransNotification($status);
            $payment->refresh();
            $booking->refresh();
        }

        if ($payment->status === 'succeeded') {
            return redirect()->route('booking.manage', ['code' => $booking->code, 't' => $booking->manageToken(), 'welcome' => 1]);
        }

        return redirect()->route('booking.checkout', ['code' => $booking->code])
            ->with('error', 'The payment was not completed. Your slot is held until the timer ends; you can try again.');
    }
}
