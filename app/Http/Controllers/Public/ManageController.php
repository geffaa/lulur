<?php

namespace App\Http\Controllers\Public;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\AvailabilityEngine;
use App\Services\BookingConflictException;
use App\Services\BookingService;
use App\Services\IcsService;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;

/** B05 — manage booking via the signed link (?t=). */
class ManageController extends Controller
{
    public function __construct(
        protected BookingService $bookings,
        protected AvailabilityEngine $engine,
    ) {
    }

    public function show(Request $request, string $code)
    {
        $booking = Booking::with(['items.service.form.activeVersion', 'items.addons', 'items.resources.staff', 'items.resources.room', 'location', 'tenant', 'client'])
            ->where('code', $code)
            ->firstOrFail();

        abort_unless($booking->hasValidManageToken($request->get('t')), 403, 'This link is not valid.');

        $item = $booking->items->first();
        $tz = $booking->location->timezone;
        $start = $item->starts_at->copy()->timezone($tz);
        $policy = $booking->policy_snapshot;

        // policy check for the cancel explanation (PRD F5)
        $cancelDeadline = $start->copy()->subHours($policy['cancel_window_hours'] ?? 24);
        $insideWindow = now()->lt($cancelDeadline);

        $guests = $item->resources->whereNotNull('staff_id')->map(fn ($r) => $r->staff?->display_name)->filter()->values();
        $room = $item->resources->whereNotNull('room_id')->first()?->room;

        // unsigned guests of a couples booking sign from this same link
        $signedNames = $booking->formSubmissions->whereNotNull('signed_at')->pluck('guest_name')->all();
        $unsignedGuests = collect();
        if ($item->guests > 1) {
            $names = array_filter([$item->guest_name]);
            $unsigned = collect($names)->reject(fn ($n) => in_array($n, $signedNames));
            $unsignedGuests = $unsigned->values();
        }

        return Inertia::render('Booking/Manage', [
            'welcome' => (bool) $request->boolean('welcome'),
            'booking' => [
                'code' => $booking->code,
                'status' => $booking->status,
                'status_label' => $booking->statusEnum()->label(),
                'total' => $booking->total,
                'deposit_paid' => $booking->deposit_paid,
                'deposit_due' => $booking->deposit_due,
                'balance' => $booking->balanceDue(),
                'when' => $start->format('D j M · H:i'),
                'end' => $item->ends_at->timezone($tz)->format('H:i'),
                'date' => $start->toDateString(),
                'start_time' => $start->format('H:i'),
                'guests' => $item->guests,
                'guest_names' => array_filter([$item->guest_name]),
                'therapists' => $guests,
                'room' => $room?->name,
                'service' => [
                    'name' => $item->service->name,
                    'duration' => $item->duration_min,
                    'photo' => $item->service->photo,
                    'variant_id' => $item->service_variant_id,
                ],
                'addons' => $item->addons->map(fn ($a) => ['name' => $a->name, 'price' => $a->price]),
                'form_missing' => $booking->formMissing(),
                'signed_names' => $signedNames,
                'unsigned_guests' => $unsignedGuests,
                'package_left' => optional($booking->client?->packages()->where('sessions_left', '>', 0)->first())->sessions_left,
            ],
            'policy' => [
                'cancel_deadline' => $cancelDeadline->format('D j M, H:i'),
                'inside_window' => $insideWindow,
                'deposit_kept' => ! $insideWindow && $booking->deposit_paid > 0,
            ],
            'currency' => $booking->tenant->currency,
            'brand' => [
                'name' => $booking->tenant->name,
                'logo_letter' => $booking->tenant->branding['logo_letter'] ?? 'T',
            ],
        ]);
    }

    /** Reschedule with the same policy rules (PRD flow 6). */
    public function reschedule(Request $request, string $code)
    {
        $booking = Booking::where('code', $code)->firstOrFail();
        abort_unless($booking->hasValidManageToken($request->get('t')), 403);

        $data = $request->validate(['start' => 'required|date_format:Y-m-d H:i']);

        try {
            $this->bookings->move($booking, $data['start']);
        } catch (BookingConflictException $e) {
            return response()->json(['message' => $e->reason], 409);
        }

        return back()->with('success', 'Your booking was moved.');
    }

    public function cancel(Request $request, string $code)
    {
        $booking = Booking::where('code', $code)->firstOrFail();
        abort_unless($booking->hasValidManageToken($request->get('t')), 403);
        abort_unless($booking->statusEnum()->blocksResources(), 422, 'This booking can no longer be cancelled.');

        $policy = $booking->policy_snapshot;
        $start = $booking->items()->first()->starts_at;
        $insideWindow = $start->gt(now()->addHours($policy['cancel_window_hours'] ?? 24));

        $this->bookings->cancel($booking, 'client', refundDeposit: $insideWindow);

        return back()->with('success', $insideWindow
            ? 'Booking cancelled. Your deposit will be refunded.'
            : 'Booking cancelled. The deposit is kept per the cancellation policy.');
    }

    public function ics(string $code, Request $request, IcsService $ics)
    {
        $booking = Booking::where('code', $code)->firstOrFail();
        abort_unless($booking->hasValidManageToken($request->get('t')), 403);

        return response($ics->forBooking($booking), 200, [
            'Content-Type' => 'text/calendar; charset=utf-8',
            'Content-Disposition' => 'attachment; filename="'.$booking->code.'.ics"',
        ]);
    }

    /** Second guest signs the consent form from the link in the confirmation. */
    public function sign(Request $request, string $code)
    {
        $booking = Booking::where('code', $code)->firstOrFail();
        abort_unless($booking->hasValidManageToken($request->get('t')), 403);

        $data = $request->validate([
            'guest_name' => 'required|string',
            'answers' => 'nullable|array',
            'signature' => 'nullable|string|max:20000',
        ]);

        $item = $booking->items()->with('service')->first();
        $form = $item->service->form;
        abort_unless($form?->active_version_id, 404, 'This booking has no form.');

        \App\Models\FormSubmission::create([
            'tenant_id' => $booking->tenant_id,
            'form_version_id' => $form->active_version_id,
            'booking_id' => $booking->id,
            'client_id' => $booking->client_id,
            'guest_name' => $data['guest_name'],
            'answers' => $data['answers'] ?? [],
            'signature' => $data['signature'] ?? null,
            'signed_name' => $data['guest_name'],
            'signed_at' => now(),
            'expires_at' => now()->addMonths(config('lulur.form_validity_months', 12)),
        ]);

        return back()->with('success', 'Thanks — the form is signed.');
    }
}
