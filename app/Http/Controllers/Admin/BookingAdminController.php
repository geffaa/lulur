<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Client;
use App\Models\Service;
use App\Models\ServiceVariant;
use App\Services\BookingConflictException;
use App\Services\BookingService;
use App\Services\PaymentService;
use App\Support\Money;
use App\Support\TenantContext;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BookingAdminController extends Controller
{
    public function __construct(
        protected TenantContext $ctx,
        protected BookingService $bookings,
        protected PaymentService $payments,
    ) {
    }

    /** A05 — bookings list with search + status filter. */
    public function index(Request $request)
    {
        $tenant = $this->ctx->check();

        $q = Booking::query()
            ->with(['client:id,name', 'items.service:id,name', 'items:id,booking_id,service_id,starts_at'])
            ->orderByDesc('created_at');

        if ($status = $request->get('status')) {
            $q->where('status', $status);
        }
        if ($search = $request->get('search')) {
            $q->where(function ($w) use ($search) {
                $w->where('code', 'like', "%$search%")
                    ->orWhereHas('client', fn ($c) => $c->where('name', 'like', "%$search%"));
            });
        }

        $bookings = $q->limit(100)->get()->map(fn ($b) => [
            'id' => $b->id,
            'code' => $b->code,
            'status' => $b->status,
            'status_label' => $b->statusEnum()->label(),
            'source' => $b->source,
            'client' => $b->client?->name ?? 'Walk-in',
            'service' => $b->items->first()?->service?->name,
            'when' => $b->items->first()?->starts_at?->timezone($tenant->default_timezone)->format('D j M, H:i'),
            'total' => $b->total,
            'currency' => $tenant->currency,
        ]);

        return inertia('Admin/Bookings', [
            'bookings' => $bookings,
            'filters' => ['status' => $status, 'search' => $search],
            'statuses' => collect(BookingStatus::cases())->map(fn ($s) => ['value' => $s->value, 'label' => $s->label()]),
        ]);
    }

    /** New booking from the calendar (walk-in / phone). */
    public function store(Request $request, BookingService $bookings)
    {
        $tenant = $this->ctx->check();

        $data = $request->validate([
            'client_id' => 'nullable|uuid',
            'client_name' => 'required_without:client_id|string|max:120',
            'client_phone' => 'nullable|string|max:24',
            'service_variant' => 'required|uuid',
            'addons' => 'array',
            'start' => 'required|date_format:Y-m-d H:i',
            'source' => ['required', Rule::in(['walk_in', 'phone'])],
            'staff' => 'nullable|uuid',
            'location' => 'nullable|uuid',
        ]);

        $variant = ServiceVariant::with('service')->findOrFail($data['service_variant']);
        $service = $variant->service;
        $location = $tenant->locations()->find($data['location'] ?? null)
            ?? $tenant->locations()->first();

        $client = $data['client_id'] ? Client::findOrFail($data['client_id']) : Client::create([
            'name' => $data['client_name'],
            'phone_e164' => $data['client_phone'] ?? null,
            'avatar_hue' => \App\Support\Str::hue($data['client_name']),
        ]);

        try {
            $booking = $bookings->createAdmin(
                $tenant,
                $location,
                $client,
                $service,
                $variant,
                $data['addons'] ?? [],
                $data['start'],
                $data['source'],
                $data['staff'] ?? null,
            );
        } catch (BookingConflictException $e) {
            return back()->withErrors(['start' => $e->reason === 'slot_gone'
                ? 'That slot is no longer available — pick another time.'
                : $e->reason]);
        }

        return redirect()->route('admin.calendar', [
            'date' => $booking->items()->min('starts_at')->toDateString(),
            'booking' => $booking->id,
        ])->with('success', "Booking {$booking->code} created.");
    }

    /** Drag-reschedule with conflict reasons (PRD F8). */
    public function move(Request $request, Booking $booking)
    {
        $data = $request->validate([
            'start' => 'nullable|date_format:Y-m-d H:i',
            'staff_ids' => 'nullable|array',
            'room_id' => 'nullable|uuid',
        ]);

        try {
            $this->bookings->move(
                $booking,
                $data['start'] ?? $booking->items()->min('starts_at'),
                $data['staff_ids'] ?? null,
                $data['room_id'] ?? null,
            );
        } catch (BookingConflictException $e) {
            return response()->json(['message' => $e->reason], 422);
        }

        return response()->json(['ok' => true, 'booking' => $booking->refresh()->only(['id', 'code', 'status'])]);
    }

    /** check_in / start / complete / no_show transitions from the panel. */
    public function status(Request $request, Booking $booking)
    {
        $action = $request->validate(['action' => 'required|in:check_in,start,complete,no_show,confirm'])['action'];

        match ($action) {
            'check_in' => $this->bookings->checkIn($booking),
            'start' => $this->bookings->startService($booking),
            'complete' => $this->bookings->complete($booking),
            'no_show' => $this->bookings->markNoShow($booking),
            'confirm' => $this->bookings->confirmWithoutPayment($booking),
        };

        return back()->with('success', 'Booking updated.');
    }

    /** Front-desk checkout with tip allocation (PRD F6). */
    public function checkout(Request $request, Booking $booking, PaymentService $payments)
    {
        $data = $request->validate([
            'tip' => 'nullable|integer|min:0',
            'tip_mode' => 'nullable|in:none,p5,p10,custom',
            'method' => 'nullable|in:card,qris,va,cash',
        ]);

        $tip = (int) ($data['tip'] ?? 0);
        $payments->checkout($booking, $tip, [], $data['method'] ?? 'card');
        $this->bookings->complete($booking);

        return back()->with('success', "Checked out — ".Money::format($booking->balanceDue() + $tip, $booking->tenant->currency).' settled.');
    }

    /** No-show fee from the saved card (manager only, audited). */
    public function noShowFee(Request $request, Booking $booking)
    {
        try {
            $payment = $this->bookings->chargeNoShowFee($booking, $request->user()->name);
        } catch (\Illuminate\Http\Exceptions\HttpResponseException $e) {
            throw $e;
        }

        return back()->with('success', 'No-show fee charged: '.Money::format($payment->amount, $booking->tenant->currency));
    }

    /** Redeem one package session for a booking item. */
    public function redeemPackage(Request $request, Booking $booking)
    {
        $client = $booking->client;
        $item = $booking->items()->with('service')->first();

        $clientPackage = $client?->packages()
            ->where('sessions_left', '>', 0)
            ->where('expires_at', '>', now())
            ->whereHas('package', fn ($p) => $p->where('service_id', $item->service_id))
            ->orderBy('expires_at')
            ->first();

        abort_unless($clientPackage, 422, 'No package session left for this service.');

        \App\Models\PackageRedemption::create([
            'tenant_id' => $booking->tenant_id,
            'client_package_id' => $clientPackage->id,
            'booking_item_id' => $item->id,
            'redeemed_at' => now(),
        ]);

        $clientPackage->decrement('sessions_left');

        return back()->with('success', "Session redeemed — {$clientPackage->sessions_left} left.");
    }
}
