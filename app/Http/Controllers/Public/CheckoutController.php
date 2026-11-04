<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Enums\BookingStatus;
use App\Services\BookingService;
use App\Services\PaymentService;
use App\Support\Money;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function __construct(
        protected BookingService $bookings,
        protected PaymentService $payments,
    ) {
    }

    /** B03 — details + form + deposit. */
    public function show(Request $request, string $code)
    {
        $booking = Booking::with(['items.service.form.activeVersion', 'items.addons', 'location', 'tenant'])
            ->where('code', $code)
            ->firstOrFail();

        abort_unless($booking->status === BookingStatus::Held->value, 404);

        if ($booking->hold_expires_at && $booking->hold_expires_at->isPast()) {
            return redirect()->route('booking.index')->with('error', 'Your hold expired. Please choose a time again.');
        }

        $item = $booking->items->first();
        $service = $item->service;
        $form = $service->requires_form_id ? $service->form->activeVersion : null;
        $tenant = $booking->tenant;

        return Inertia::render('Booking/Checkout', [
            'booking' => [
                'code' => $booking->code,
                'status' => $booking->status,
                'total' => $booking->total,
                'deposit_due' => $booking->deposit_due,
                'hold_seconds_left' => $booking->hold_expires_at ? max(0, (int) now()->diffInSeconds($booking->hold_expires_at, false)) : null,
                'when' => $item->starts_at->timezone($booking->location->timezone)->format('D j M · H:i'),
                'end' => $item->ends_at->timezone($booking->location->timezone)->format('H:i'),
                'guests' => $item->guests,
                'service' => [
                    'name' => $service->name,
                    'duration' => $item->duration_min,
                    'photo' => $service->photo,
                    'requires_form' => (bool) $service->requires_form_id,
                ],
                'addons' => $item->addons->map(fn ($a) => ['name' => $a->name, 'price' => $a->price, 'duration' => $a->duration_min]),
            ],
            'form' => $form ? [
                'name' => $form->form->name,
                'version' => $form->version,
                'updated' => $form->published_at?->format('j M Y'),
                'consent_text' => $form->consent_text,
                'fields' => $form->fields,
            ] : null,
            'policy' => [
                'deposit_percent' => $booking->policy_snapshot['deposit_percent'] ?? 0,
                'cancel_window_hours' => $booking->policy_snapshot['cancel_window_hours'] ?? 24,
                'saved_card_mode' => $booking->policy_snapshot['saved_card_mode'] ?? 'optional',
                'cancel_deadline' => $item->starts_at->subHours($booking->policy_snapshot['cancel_window_hours'] ?? 24)->format('D j M, H:i'),
            ],
            'currency' => $tenant->currency,
            'payment_methods' => $tenant->currency === 'IDR'
                ? [['id' => 'card', 'label' => 'Card', 'hint' => 'Visa, Mastercard, Amex · charged in IDR'], ['id' => 'qris', 'label' => 'QRIS', 'hint' => 'Any Indonesian bank or e-wallet app']]
                : [['id' => 'card', 'label' => 'Card', 'hint' => 'Visa, Mastercard, Amex']],
        ]);
    }

    public function saveDetails(Request $request, string $code)
    {
        $booking = Booking::where('code', $code)->firstOrFail();
        abort_unless($booking->status === BookingStatus::Held->value, 404);

        $data = $request->validate([
            'name' => 'required|string|max:120',
            'phone' => 'required|string|max:24',
            'email' => 'nullable|email',
            'marketing_consent' => 'nullable|boolean',
            'guests' => 'array',
            'guests.*.name' => 'nullable|string|max:120',
            'guests.*.answers' => 'nullable|array',
            'guests.*.signature' => 'nullable|string|max:20000',
            'guests.*.pressure' => 'nullable|in:light,medium,firm',
            'guests.*.allergies_note' => 'nullable|string|max:500',
            'guests.*.avoid' => 'nullable|string|max:500',
            'guests.*.note' => 'nullable|string|max:500',
        ]);

        $this->bookings->saveDetails($booking, $data);

        return back();
    }

    public function pay(Request $request, string $code)
    {
        $booking = Booking::with('items.service')->where('code', $code)->firstOrFail();
        abort_unless($booking->status === BookingStatus::Held->value, 404);

        $data = $request->validate(['method' => 'nullable|in:card,qris,va']);
        $method = $data['method'] ?? ($booking->tenant->currency === 'IDR' ? 'qris' : 'card');

        // zero-deposit tenants (Juniper: card on file) confirm straight away
        if ($booking->deposit_due <= 0) {
            $this->bookings->confirmWithoutPayment($booking);
            $token = $booking->manageToken();

            return response()->json([
                'redirect' => route('booking.manage', ['code' => $booking->code, 't' => $token, 'welcome' => 1]),
            ]);
        }

        $payment = $this->payments->createForBooking($booking, 'deposit', $method);
        try {
            $payload = $this->payments->gatewayFor($booking->tenant->currency)->start($payment);
        } catch (\RuntimeException $e) {
            report($e);
            $payment->update(['status' => 'failed']);

            return response()->json(['message' => 'The payment provider could not start the payment. Please try again.'], 502);
        }

        return response()->json(['redirect' => $payload['redirect']]);
    }
}
