<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

/**
 * The simulated provider page (sandbox mode of Stripe/Midtrans). Approving
 * triggers the exact same code path as the real webhook: idempotent by
 * idempotency_key, so replays are harmless.
 */
class SandboxPayController extends Controller
{
    public function show(Request $request, Payment $payment)
    {
        $booking = $payment->booking()->with('tenant', 'items.service')->firstOrFail();

        return view('pay.sandbox', [
            'payment' => $payment,
            'booking' => $booking,
            'amount' => \App\Support\Money::format($payment->amount, $booking->tenant->currency),
            'method' => $payment->method,
            'tenant' => $booking->tenant,
        ]);
    }

    public function approve(Request $request, Payment $payment, PaymentService $payments)
    {
        // simulate the provider webhook with the same idempotency contract
        $payments->markSucceeded($payment->idempotency_key, 'sbx_'.substr(md5($payment->idempotency_key), 0, 10));
        $payment->refresh();
        $booking = $payment->booking()->firstOrFail();
        $token = $booking->manageToken();

        return redirect()->route('booking.manage', ['code' => $booking->code, 't' => $token, 'welcome' => 1]);
    }

    public function decline(Request $request, Payment $payment)
    {
        $payment->update(['status' => 'failed']);

        return redirect()->route('booking.checkout', ['code' => $payment->booking?->code])
            ->with('error', 'Payment declined. Your slot is still held — try another method.');
    }
}
