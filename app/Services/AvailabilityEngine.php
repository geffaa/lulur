<?php

namespace App\Services;

use App\Models\BookingResource;
use App\Models\Location;
use App\Models\Service;
use App\Models\ServiceVariant;
use App\Models\Staff;
use App\Models\Room;
use App\Support\TimeWindow;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;

/**
 * The heart of Lulur: a slot only exists when a qualified therapist AND a
 * suitable room are both free for duration + buffer.
 *
 * Per docs/TECH-SPEC.md:
 *  1. variant (duration + buffer), room_type, therapists_needed, skills
 *  2. candidate therapists: skill + shift covering + not on time off + gender
 *  3. 15-minute grid over opening hours
 *  4. slot valid if >= N free therapists AND >= 1 free suitable room
 *  5. auto-assign: least scheduled minutes (therapist), tightest fit (room)
 *
 * The final truth is the exclusion constraint on booking_resources at
 * INSERT time; this engine only computes what to offer.
 */
class AvailabilityEngine
{
    public function __construct(protected SlotCache $cache)
    {
    }

    public function forServiceOnDate(
        Service $service,
        ServiceVariant $variant,
        Location $location,
        string|CarbonImmutable $date,
        ?string $staffId = null,
        ?string $genderPref = null,
    ): DayAvailability {
        $date = CarbonImmutable::instance(CarbonImmutable::parse($date, $location->timezone)->startOfDay());
        $duration = $variant->duration_min;
        $buffer = $service->buffer_min;
        $needed = max(1, $service->therapists_needed);
        $window = $duration + $buffer;

        $staff = $this->candidateTherapists($service, $location, $date, $staffId, $genderPref);
        $rooms = $this->suitableRooms($service, $location);
        $grid = $this->gridStarts($location, $date, $window);

        if ($grid->isEmpty() || $staff->count() < $needed || $rooms->isEmpty()) {
            return new DayAvailability($date, collect(), $grid->isNotEmpty());
        }

        $staffBusy = $this->busyByStaff($date, $staff, $location);
        $roomBusy = $this->busyByRoom($date, $rooms, $location);
        $offRanges = $this->timeOffByStaff($date, $staff);
        $now = CarbonImmutable::now($location->timezone);

        $slots = [];
        foreach ($grid as $start) {
            if ($start->lt($now)) {
                continue; // never offer past slots
            }
            $end = $start->addMinutes($duration);
            $resEnd = $start->addMinutes($window);

            $free = $staff->filter(function (Staff $s) use ($start, $end, $resEnd, $staffBusy, $offRanges, $location) {
                $shift = $s->shiftFor($start, $location->id);
                if (! $shift || $start->lt($shift->starts_at) || $end->gt($shift->ends_at)) {
                    return false;
                }

                return ! TimeWindow::anyOverlaps($start, $resEnd, $staffBusy[$s->id] ?? collect())
                    && ! TimeWindow::anyOverlaps($start, $resEnd, $offRanges[$s->id] ?? collect());
            });

            if ($free->count() < $needed) {
                continue;
            }

            $needCapacity = $service->isCouples() ? 2 : 1;
            $freeRoom = $rooms->first(fn (Room $r) => $r->capacity >= $needCapacity
                && ! TimeWindow::anyOverlaps($start, $resEnd, $roomBusy[$r->id] ?? collect()));

            if (! $freeRoom) {
                continue;
            }

            $slots[] = new Slot($start, $end, $freeRoom, $free->values()->all());
        }

        return new DayAvailability($date, collect($slots), true);
    }

    /** Slot counts for the 14-day strip (good / low / none dots). */
    public function summary(Service $service, ServiceVariant $variant, Location $location, CarbonImmutable $from, int $days = 14, ?string $genderPref = null): Collection
    {
        $out = [];
        for ($i = 0; $i < $days; $i++) {
            $date = $from->addDays($i);
            $day = $this->forServiceOnDate($service, $variant, $location, $date, null, $genderPref);
            $out[] = ['date' => $date->toDateString(), 'count' => $day->slots->count()];
        }

        return collect($out);
    }

    /**
     * Choose therapists + room for a slot at booking time.
     * Therapist: least scheduled minutes that day ("any therapist" balancing).
     * Room: tightest fit — a couples suite only when nothing else is left.
     */
    public function assign(Service $service, ServiceVariant $variant, Location $location, CarbonImmutable $start, ?string $staffId = null, ?string $genderPref = null): array
    {
        $day = $this->forServiceOnDate($service, $variant, $location, $start, $staffId, $genderPref);
        $slot = $day->slots->first(fn (Slot $s) => $s->start->equalTo($start));

        if (! $slot) {
            return [null, null];
        }

        $needed = max(1, $service->therapists_needed);

        if ($staffId) {
            $chosen = collect([$slot->staff])->flatten()->first(fn (Staff $s) => $s->id === $staffId);
            $chosen = $chosen ? collect([$chosen]) : null;
        } else {
            $chosen = collect($slot->staff)
                ->sortBy(fn (Staff $s) => $this->scheduledMinutes($s, $start))
                ->take($needed)
                ->values();
        }

        if (! $chosen || $chosen->count() < $needed) {
            return [null, null];
        }

        $room = $this->pickTightestRoom($service, $location, $start, $start->addMinutes($variant->duration_min + $service->buffer_min));

        return [$chosen, $room];
    }

    protected function scheduledMinutes(Staff $s, CarbonImmutable $day): int
    {
        $dayStart = $day->startOfDay();
        $dayEnd = $day->endOfDay();

        return (int) BookingResource::query()
            ->where('staff_id', $s->id)
            ->where('status', 'active')
            ->where('starts_at', '<', $dayEnd)
            ->where('ends_at', '>', $dayStart)
            ->get()
            ->sum(fn ($r) => $r->starts_at->diffInMinutes($r->ends_at->min($dayEnd)));
    }

    protected function pickTightestRoom(Service $service, Location $location, CarbonImmutable $start, CarbonImmutable $resEnd): ?Room
    {
        $rooms = $this->suitableRooms($service, $location);
        $busy = $this->busyByRoom($start, $rooms, $location);
        $needCapacity = $service->isCouples() ? 2 : 1;

        return $rooms
            ->filter(fn (Room $r) => $r->capacity >= $needCapacity
                && ! TimeWindow::anyOverlaps($start, $resEnd, $busy[$r->id] ?? collect()))
            ->sortBy(fn (Room $r) => ($r->room_type === $service->room_type ? 0 : 1) * 10 + $r->capacity)
            ->first();
    }

    /** Active staff with the skill, shifted that day, not on leave, matching gender. */
    protected function candidateTherapists(Service $service, Location $location, CarbonImmutable $date, ?string $staffId, ?string $genderPref): Collection
    {
        $dayStart = $date->startOfDay();
        $dayEnd = $date->endOfDay();

        $q = Staff::query()
            ->where('staff.active', true)
            ->whereHas('skills', fn ($q) => $q->where('services.id', $service->id))
            ->whereHas('shifts', fn ($q) => $q
                ->where('location_id', $location->id)
                ->where('starts_at', '<', $dayEnd)
                ->where('ends_at', '>', $dayStart))
            ->with(['skills', 'shifts']);

        if ($staffId) {
            $q->where('staff.id', $staffId);
        }

        if ($genderPref === 'female' || $genderPref === 'male') {
            $q->where('staff.gender', $genderPref);
        }

        return $q->get();
    }

    /**
     * Rooms that may serve this service. Exact type first; a couples suite is
     * allowed as a fallback for single treatments only (the fit sort keeps it
     * last so it is never chosen when a single room is free).
     */
    protected function suitableRooms(Service $service, Location $location): Collection
    {
        return $location->rooms()
            ->where('active', true)
            ->orderBy('sort')
            ->get()
            ->filter(fn (Room $r) => match (true) {
                $service->room_type === 'any' => true,
                $r->room_type === $service->room_type => true,
                $service->room_type === 'single' && $r->room_type === 'couples' => true,
                default => false,
            })
            ->values();
    }

    /** 15-minute starts across opening hours. */
    protected function gridStarts(Location $location, CarbonImmutable $date, int $windowMin): Collection
    {
        if (in_array($date->toDateString(), $location->holidays ?? [], true)) {
            return collect();
        }

        $ranges = $location->openingHoursFor(strtolower($date->format('D')));
        $step = config('lulur.slot_step_minutes', 15);
        $starts = collect();

        foreach ($ranges as [$from, $to]) {
            $open = $date->setTimeFromTimeString($from);
            $close = $date->setTimeFromTimeString($to);

            for ($t = $open->copy(); $t->addMinutes($windowMin)->lte($close); $t = $t->addMinutes($step)) {
                $starts->push($t->copy());
            }
        }

        return $starts->values();
    }

    protected function activeResourceQuery(CarbonImmutable $start, CarbonImmutable $end, string $foreignKey, $ids, string $locationId)
    {
        return BookingResource::query()
            ->whereNotNull($foreignKey)
            ->where('status', 'active')
            ->where('starts_at', '<', $end)
            ->where('ends_at', '>', $start)
            ->whereIn($foreignKey, $ids)
            ->whereExists(function ($q) use ($locationId) {
                $q->selectRaw(1)
                    ->from('bookings as b')
                    ->join('booking_items as bi', 'bi.booking_id', '=', 'b.id')
                    ->whereColumn('bi.id', 'booking_resources.booking_item_id')
                    ->where('b.location_id', $locationId);
            });
    }

    protected function busyByStaff(CarbonImmutable $date, Collection $staff, Location $location): Collection
    {
        return $this->activeResourceQuery($date->startOfDay(), $date->endOfDay(), 'staff_id', $staff->pluck('id'), $location->id)
            ->get()
            ->groupBy('staff_id')
            ->map(fn ($rows) => $rows->map(fn ($r) => [$r->starts_at, $r->ends_at]));
    }

    protected function busyByRoom(CarbonImmutable $date, Collection $rooms, Location $location): Collection
    {
        return $this->activeResourceQuery($date->startOfDay(), $date->endOfDay(), 'room_id', $rooms->pluck('id'), $location->id)
            ->get()
            ->groupBy('room_id')
            ->map(fn ($rows) => $rows->map(fn ($r) => [$r->starts_at, $r->ends_at]));
    }

    protected function timeOffByStaff(CarbonImmutable $date, Collection $staff): Collection
    {
        $start = $date->startOfDay();
        $end = $date->endOfDay();

        return \App\Models\TimeOff::query()
            ->whereIn('staff_id', $staff->pluck('id'))
            ->where('period', '&&', sprintf('[%s,%s)', $start->toIso8601String(), $end->toIso8601String()))
            ->get()
            ->groupBy('staff_id')
            ->map(fn ($rows) => $rows->map(fn ($r) => [
                CarbonImmutable::instance($r->period->start),
                CarbonImmutable::instance($r->period->end),
            ]));
    }
}
