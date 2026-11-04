<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Location;
use App\Models\Room;
use App\Models\Staff;
use App\Support\Money;
use App\Support\Str;
use App\Support\TenantContext;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    /** A01 — front-desk calendar: day view per therapist or per room. */
    public function index(Request $request)
    {
        $tenant = $this->ctx->check();
        $locations = $tenant->locations()->orderBy('sort')->get();
        $location = $locations->firstWhere('slug', $request->get('location')) ?? $locations->first();

        $date = CarbonImmutable::parse($request->get('date', CarbonImmutable::today($location->timezone)->toDateString()), $location->timezone);
        $group = $request->get('group', 'therapists'); // therapists | rooms

        [$columns, $bookings] = $group === 'rooms'
            ? $this->roomColumns($location, $date)
            : $this->therapistColumns($location, $date);

        return Inertia::render('Admin/Calendar', [
            'date' => $date->toDateString(),
            'group' => $group,
            'locations' => $locations->map(fn ($l) => ['id' => $l->id, 'name' => $l->name, 'slug' => $l->slug, 'timezone' => $l->timezone])->values(),
            'location' => ['id' => $location->id, 'name' => $location->name, 'slug' => $location->slug, 'timezone' => $location->timezone],
            'columns' => $columns,
            'bookings' => $bookings,
            'selected' => $request->filled('booking') ? $this->panelData(Booking::find($request->get('booking'))) : null,
            'now' => CarbonImmutable::now($location->timezone)->toIso8601String(),
            'calendarStart' => config('lulur.calendar_start'),
            'calendarEnd' => config('lulur.calendar_end'),
            'pxPerHour' => config('lulur.calendar_px_per_hour'),
        ]);
    }

    /** Right-panel detail (also used by the calendar panel route). */
    public function panel(Request $request, Booking $booking)
    {
        return response()->json($this->panelData($booking));
    }

    protected function therapistColumns(Location $location, CarbonImmutable $date): array
    {
        $dayStart = $date->startOfDay();
        $dayEnd = $date->endOfDay();
        $dayStart = $dayStart; $dayEnd = $dayEnd;

        $staff = Staff::query()
            ->where('staff.active', true)
            ->whereHas('shifts', fn ($q) => $q
                ->where('location_id', $location->id)
                ->where('starts_at', '<', $date->endOfDay())
                ->where('ends_at', '>', $date->startOfDay()))
            ->orderBy('sort')
            ->with('skills')
            ->get();

        $shifts = $staff->map(function (Staff $s) use ($location, $date, $dayStart, $dayEnd) {
            $shift = $s->shiftFor($date, $location->id);

            return [
                'id' => $s->id,
                'name' => $s->display_name,
                'initials' => $s->initials(),
                'hue' => Str::hue($s->display_name),
                'level' => $s->level,
                'specialty' => $s->specialty,
                'shift_start' => $shift?->starts_at?->format('H:i'),
                'shift_end' => $shift?->ends_at?->format('H:i'),
                'booked_minutes' => $this->bookedMinutesForStaff($s->id, $dayStart, $dayEnd),
            ];
        })->values()->all();

        return [$shifts, $this->dayBookings($location, $dayStart, $dayEnd)];
    }

    protected function roomColumns(Location $location, CarbonImmutable $date): array
    {
        $dayStart = $date->startOfDay();
        $dayEnd = $date->endOfDay();

        $rooms = $location->rooms()->where('active', true)->orderBy('sort')->get()->map(fn (Room $r) => [
            'id' => $r->id,
            'name' => $r->name,
            'room_type' => $r->room_type,
            'capacity' => $r->capacity,
        ])->values()->all();

        return [$rooms, $this->dayBookings($location, $dayStart, $dayEnd)];
    }

    protected function dayBookings(Location $location, $dayStart, $dayEnd): array
    {
        $bookings = Booking::query()
            ->where('location_id', $location->id)
            ->whereIn('status', array_map(fn (BookingStatus $s) => $s->value, BookingStatus::cases()))
            ->whereHas('items', fn ($q) => $q->where('starts_at', '<', $dayEnd)->where('ends_at', '>', $dayStart))
            ->with([
                'client:id,name,avatar_hue,pressure_pref,allergies,avoid_areas',
                'items:id,booking_id,service_id,guests,guest_name,starts_at,ends_at,duration_min,price',
                'items.service:id,name',
                'items.addons:id,booking_item_id,name,price',
                'items.resources:id,booking_item_id,staff_id,room_id,starts_at,ends_at,status',
                'items.resources.staff:id,display_name',
                'items.resources.room:id,name',
                'formSubmissions:id,booking_id,guest_name,signed_at',
            ])
            ->orderBy('created_at')
            ->get();

        return $bookings->map(fn ($b) => $this->serializeCalendarBooking($b))->values()->all();
    }

    public function serializeCalendarBooking(Booking $b): array
    {
        $item = $b->items->first();
        $staffRows = $item->resources->whereNotNull('staff_id')->where('status', 'active');
        $roomRow = $item->resources->whereNotNull('room_id')->where('status', 'active')->first();
        $partnerNames = $staffRows->map(fn ($r) => $r->staff?->display_name)->filter()->values();

        return [
            'id' => $b->id,
            'code' => $b->code,
            'status' => $b->status,
            'status_label' => $b->statusEnum()->label(),
            'source' => $b->source,
            'walk_in' => $b->source === 'walk_in',
            'client' => $b->client?->name ?? 'Walk-in',
            'client_id' => $b->client_id,
            'service' => $item->service->name,
            'duration' => $item->duration_min,
            'guests' => $item->guests,
            'start' => $item->starts_at->toIso8601String(),
            'end' => $item->ends_at->toIso8601String(),
            'staff_ids' => $staffRows->pluck('staff_id')->values()->all(),
            'room_id' => $roomRow?->room_id,
            'room' => $roomRow?->room?->name,
            'staff_names' => $partnerNames->all(),
            'couples' => $item->guests > 1,
            'form_missing' => $b->formMissing(),
            'package' => $b->items->contains(fn ($i) => $i->packageRedemption()->exists()),
            'total' => $b->total,
        ];
    }

    protected function bookedMinutesForStaff(string $staffId, $start, $end): int
    {
        return (int) \App\Models\BookingResource::query()
            ->where('staff_id', $staffId)
            ->where('status', 'active')
            ->where('starts_at', '<', $end)
            ->where('ends_at', '>', $start)
            ->get()
            ->sum(fn ($r) => $r->starts_at->diffInMinutes($r->ends_at));
    }

    /** Detail panel content (A01 right column). */
    public function panelData(?Booking $b): ?array
    {
        if (! $b) {
            return null;
        }

        $b->load(['client', 'location', 'tenant', 'items.service', 'items.addons', 'items.resources.staff', 'items.resources.room', 'payments', 'formSubmissions']);
        $item = $b->items->first();
        $tz = $b->location->timezone;
        $staffRows = $item->resources->whereNotNull('staff_id')->where('status', 'active');
        $roomRow = $item->resources->whereNotNull('room_id')->where('status', 'active')->first();
        $therapists = $staffRows->map(fn ($r) => $r->staff)->filter()->unique('id');

        $guestRows = [];
        $signedBy = $b->formSubmissions->pluck('guest_name')->all();
        if ($item->guests > 1) {
            // couples: one row per guest — form status per guest
            $names = array_values(array_filter([$item->guest_name]));
            if (count($names) < $item->guests) {
                $names = array_merge($names, array_map(fn ($i) => "Guest {$i}", range(count($names) + 1, $item->guests)));
            }
            foreach ($names as $i => $name) {
                $guestRows[] = [
                    'name' => $name,
                    'prefs' => trim(($b->client?->pressure_pref ? ucfirst($b->client->pressure_pref).' pressure' : '').($b->client?->avoid_areas ? ' · avoid '.$b->client->avoid_areas : '')) ?: null,
                    'form_signed' => in_array($name, $signedBy),
                ];
            }
        } else {
            $guestRows[] = [
                'name' => $b->client?->name ?? 'Walk-in',
                'prefs' => trim(($b->client?->pressure_pref ? ucfirst($b->client->pressure_pref).' pressure' : '').($b->client?->allergies ? ' · allergy: '.$b->client->allergies : '')) ?: null,
                'form_signed' => $item->service->requires_form_id ? in_array($b->client?->name, $signedBy) : null,
            ];
        }

        $deposit = $b->payments->firstWhere('kind', 'deposit');
        $tips = $b->payments->where('kind', 'tip');

        return [
            'id' => $b->id,
            'code' => $b->code,
            'status' => $b->status,
            'status_label' => $b->statusEnum()->label(),
            'source' => $b->source,
            'online' => $b->source === 'online',
            'booked_at' => $b->created_at->timezone($tz)->format('j M'),
            'service' => $item->service->name.' '.($item->duration_min - $item->addons->sum('duration_min')),
            'when' => $item->starts_at->timezone($tz)->format('D j M · H:i'),
            'ends_at' => $item->ends_at->timezone($tz)->format('H:i'),
            'ends_in_min' => now($tz)->lt($item->ends_at) ? (int) ceil(now($tz)->diffInMinutes($item->ends_at, false)) : null,
            'guests' => $guestRows,
            'guest_count' => $item->guests,
            'room' => ['name' => $roomRow?->room?->name, 'type' => $roomRow?->room?->room_type],
            'therapists' => $therapists->map(fn ($s) => ['id' => $s->id, 'name' => $s->display_name, 'level' => $s->level])->values()->all(),
            'moves_resources' => $item->guests > 1,
            'lines' => [
                ['label' => $item->service->name.($item->guests > 1 ? " × {$item->guests} guests" : ''), 'amount' => $item->price - $item->addons->sum('price')],
                ...$item->addons->map(fn ($a) => ['label' => $a->name, 'amount' => $a->price])->values()->all(),
                ...($deposit && $deposit->status === 'succeeded' ? [['label' => 'Deposit paid · '.($deposit->method ?? 'card'), 'amount' => -$deposit->amount, 'credit' => true]] : []),
            ],
            'balance_due' => $b->balanceDue(),
            'total' => $b->total,
            'tip_total' => $b->tip_total,
            'tip_paid' => $tips->where('status', 'succeeded')->isNotEmpty(),
            'tip_staff' => $therapists->pluck('display_name')->implode(' & '),
            'tip_split' => $therapists->count(),
            'currency' => $b->tenant->currency,
            'form_missing' => $b->formMissing(),
        ];
    }
}
