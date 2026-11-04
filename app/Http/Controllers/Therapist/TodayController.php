<?php

namespace App\Http\Controllers\Therapist;

use App\Http\Controllers\Controller;
use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Support\TenantContext;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;

/** T01 — therapist Today view (phone). */
class TodayController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    public function index(Request $request)
    {
        $tenant = $this->ctx->check();
        $staff = $request->user()->staffRecordFor($tenant);
        abort_unless($staff !== null, 404, 'This user is not linked to a therapist profile.');

        $tz = $tenant->default_timezone;
        $now = CarbonImmutable::now($tz);
        $dayStart = $now->startOfDay();
        $dayEnd = $now->endOfDay();

        $bookings = Booking::query()
            ->where('location_id', $tenant->locations()->value('id'))
            ->whereIn('status', [BookingStatus::Confirmed->value, BookingStatus::CheckedIn->value, BookingStatus::InService->value, BookingStatus::Completed->value, BookingStatus::NoShow->value])
            ->whereHas('items.resources', fn ($q) => $q->where('staff_id', $staff->id))
            ->whereHas('items', fn ($q) => $q->whereBetween('starts_at', [$dayStart, $dayEnd]))
            ->with(['client:id,name,allergies,avoid_areas,pressure_pref', 'items.service:id,name', 'items.resources.room:id,name', 'items.resources:id,booking_item_id,staff_id,room_id'])
            ->get()
            ->map(function ($b) use ($tz, $now, $staff) {
                $item = $b->items->first();
                $start = $item->starts_at->timezone($tz);
                $end = $item->ends_at->timezone($tz);

                return [
                    'id' => $b->id,
                    'time' => $start->format('H:i'),
                    'until' => $end->format('H:i'),
                    'room' => $item->resources->whereNotNull('room_id')->first()?->room?->name,
                    'status' => $b->status,
                    'status_label' => $b->statusEnum()->label(),
                    'client' => $b->client?->name ?? 'Walk-in',
                    'service' => $item->service->name,
                    'prefs' => collect([
                        $b->client?->pressure_pref ? ucfirst($b->client->pressure_pref).' pressure' : null,
                        $b->client?->allergies ? $b->client->allergies : null,
                        $b->client?->avoid_areas ? 'avoid '.$b->client->avoid_areas : null,
                    ])->filter()->implode(' · ') ?: null,
                    'form_signed' => ! $b->formMissing(),
                    'tip' => (int) $b->payments()->where('kind', 'tip')->where('status', 'succeeded')->sum('amount'),
                    'is_now' => $now->between($start, $end),
                    'past' => $end->isPast(),
                    'progress' => $now->between($start, $end) ? (int) ($start->diffInMinutes($now) / $item->duration_min * 100) : null,
                ];
            })
            ->sortBy('time')
            ->values();

        $tipsToday = (int) $bookings->sum('tip');

        $bookedMinutes = \App\Models\BookingResource::query()
            ->where('staff_id', $staff->id)
            ->where('status', 'active')
            ->whereBetween('starts_at', [$dayStart, $dayEnd])
            ->get()
            ->sum(fn ($r) => $r->starts_at->diffInMinutes($r->ends_at));

        return Inertia::render('Therapist/Today', [
            'staff' => ['name' => $staff->display_name, 'initials' => $staff->initials()],
            'date_label' => $now->format('l, j M').' · '.$tenant->locations()->value('name'),
            'stats' => [
                'clients' => $bookings->whereIn('status', ['confirmed', 'checked_in', 'in_service', 'completed'])->count(),
                'booked_label' => sprintf('%d h %02d', intdiv($bookedMinutes, 60), $bookedMinutes % 60),
                'tips' => $tipsToday,
            ],
            'currency' => $tenant->currency,
            'bookings' => $bookings->values(),
        ]);
    }
}
