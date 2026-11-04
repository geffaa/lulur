<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\Service;
use App\Models\ServiceVariant;
use App\Models\Tenant;
use App\Services\AvailabilityEngine;
use App\Services\BookingConflictException;
use App\Services\BookingService;
use App\Services\SlotCache;
use App\Support\TenantContext;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function __construct(
        protected TenantContext $ctx,
        protected AvailabilityEngine $engine,
        protected BookingService $bookings,
    ) {
    }

    /** B01 — service menu. */
    public function index(Request $request)
    {
        $tenant = $this->ctx->check();
        $location = $this->currentLocation($tenant, $request);
        $tenant->setRelation('locations', $tenant->locations()->get());

        $services = Service::query()
            ->where('active', true)
            ->where('bookable_online', true)
            ->orderBy('sort')
            ->with(['category', 'variants', 'addons'])
            ->get()
            ->map(fn ($s) => $this->serializeService($s, $tenant));

        return Inertia::render('Booking/Services', [
            'tenant' => $this->branding($tenant, $location),
            'services' => $services,
            'location' => ['id' => $location->id, 'name' => $location->name, 'timezone' => $location->timezone],
        ]);
    }

    /** B02 — time selection page shell (flow state lives in the browser). */
    public function time(Request $request)
    {
        $tenant = $this->ctx->check();
        $location = $this->currentLocation($tenant, $request);
        $tenant->setRelation('locations', $tenant->locations()->get());

        return Inertia::render('Booking/Time', [
            'tenant' => $this->branding($tenant, $location),
            'location' => ['id' => $location->id, 'name' => $location->name, 'timezone' => $location->timezone],
            'today' => CarbonImmutable::today($location->timezone)->toDateString(), // the spa's date, not the visitor's
        ]);
    }

    /** GET /availability?service_variant=&date=&staff=&guests=2 (TECH-SPEC §4). */
    public function availability(Request $request)
    {
        $data = $request->validate([
            'service_variant' => 'required|uuid',
            'date' => 'required|date_format:Y-m-d',
            'staff' => 'nullable|uuid',
            'gender' => 'nullable|in:female,male',
        ]);

        $variant = ServiceVariant::findOrFail($data['service_variant']);
        $service = $variant->service;
        $location = $this->currentLocation($service->tenant, $request);
        $date = CarbonImmutable::parse($data['date'], $location->timezone);

        $day = $this->engine->forServiceOnDate($service, $variant, $location, $date, $data['staff'] ?? null, $data['gender'] ?? null);

        return response()->json([
            'date' => $date->toDateString(),
            'open' => $day->open,
            'slots' => $day->groupedByPartOfDay(),
            'total' => $day->slots->count(),
        ]);
    }

    /** Availability dots for the 14-day strip. */
    public function availabilitySummary(Request $request)
    {
        $data = $request->validate([
            'service_variant' => 'required|uuid',
            'from' => 'required|date_format:Y-m-d',
            'staff' => 'nullable|uuid',
            'gender' => 'nullable|in:female,male',
        ]);

        $variant = ServiceVariant::findOrFail($data['service_variant']);
        $service = $variant->service;
        $location = $this->currentLocation($service->tenant, $request);
        $from = CarbonImmutable::parse($data['from'], $location->timezone);

        $summary = $this->engine->summary($service, $variant, $location, $from, 14, $data['gender'] ?? null);

        return response()->json(['days' => $summary]);
    }

    /** POST /holds — 10-minute hold. A race is settled by the DB constraint. */
    public function hold(Request $request)
    {
        $data = $request->validate([
            'service_variant' => 'required|uuid',
            'addons' => 'array',
            'addons.*' => 'uuid',
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i',
            'staff' => 'nullable|uuid',
            'gender' => 'nullable|in:female,male',
            'previous' => 'nullable|uuid', // replace a previous hold in the same flow
        ]);

        $variant = ServiceVariant::findOrFail($data['service_variant']);
        $service = $variant->service;
        $tenant = $service->tenant;
        $location = $this->currentLocation($tenant, $request);

        // replace any previous hold from this flow
        if ($data['previous'] ?? null) {
            $previous = \App\Models\Booking::find($data['previous']);
            if ($previous && $previous->status === 'held') {
                $previous->update(['status' => 'cancelled']);
                $previous->resources()->update(['status' => 'released']);
            }
        }

        $start = CarbonImmutable::parse($data['date'].' '.$data['start'], $location->timezone);

        try {
            $booking = $this->bookings->createHold(
                tenant: $tenant,
                location: $location,
                service: $service,
                variant: $variant,
                addonIds: $data['addons'] ?? [],
                start: $start,
                staffId: $data['staff'] ?? null,
                genderPref: $data['gender'] ?? null,
            );
        } catch (BookingConflictException $e) {
            return response()->json(['error' => 'taken', 'message' => 'That time was just booked by someone else. Please pick another slot.'], 409);
        }

        $request->session()->put('hold_code', $booking->code);

        return response()->json([
            'code' => $booking->code,
            'redirect' => route('booking.checkout', ['code' => $booking->code]),
        ], 201);
    }

    protected function currentLocation(Tenant $tenant, Request $request)
    {
        $locations = $tenant->locations()->where('active', true)->orderBy('sort')->get();
        $requested = $request->get('location');
        $bySlug = $locations->firstWhere('slug', $requested);

        return $bySlug ?? $locations->first();
    }

    protected function branding($tenant, $location): array
    {
        $branding = $tenant->branding ?? [];
        $today = CarbonImmutable::now($location->timezone);
        $ranges = $location->openingHoursFor(strtolower($today->format('D')));

        return [
            'id' => $tenant->id,
            'slug' => $tenant->slug,
            'name' => $tenant->name,
            'currency' => $tenant->currency,
            'logo_letter' => $branding['logo_letter'] ?? mb_substr($tenant->name, 0, 1),
            'mark' => $branding['mark'] ?? null,
            'hero' => $branding['hero'] ?? null,
            'tagline' => $branding['tagline'] ?? null,
            'rating' => $branding['rating'] ?? null,
            'reviews' => $branding['reviews'] ?? null,
            'address' => $location->address,
            'open_today' => $ranges ? sprintf('%s–%s', $ranges[0][0], $ranges[0][1]) : null,
            'locations' => $tenant->locations->map(fn ($l) => ['id' => $l->id, 'name' => $l->name, 'slug' => $l->slug])->values(),
        ];
    }

    protected function serializeService($service, $tenant): array
    {
        return [
            'id' => $service->id,
            'name' => $service->name,
            'slug' => $service->slug,
            'description' => $service->description,
            'photo' => $service->photo,
            'badge' => $service->badge,
            'category' => $service->category?->name,
            'for_two' => $service->max_guests > 1,
            'price_basis' => $service->price_basis,
            'variants' => $service->variants->where('active', true)->map(fn ($v) => [
                'id' => $v->id,
                'duration' => $v->duration_min,
                'price' => $v->price,
            ])->values(),
            'addons' => $service->addons->where('active', true)->map(fn ($a) => [
                'id' => $a->id,
                'name' => $a->name,
                'duration' => $a->duration_min,
                'price' => $a->price,
            ])->values(),
        ];
    }
}
