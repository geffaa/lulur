<?php

namespace App\Services;

use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;

/** All bookable starts for one service variant on one day. */
class DayAvailability
{
    /**
     * @param Collection<int, Slot> $slots
     */
    public function __construct(
        public readonly CarbonImmutable $date,
        public readonly Collection $slots,
        public readonly bool $open = true,
    ) {
    }

    public function hasStart(string $time): bool
    {
        return $this->slots->contains(fn (Slot $s) => $s->start->format('H:i') === $time);
    }

    /** Always returns all three keys (the booking UI reads .length on each, even when a part of the day is empty). */
    public function groupedByPartOfDay(): Collection
    {
        $groups = $this->slots->groupBy(function (Slot $s) {
            return match (true) {
                $s->start->hour < 12 => 'morning',
                $s->start->hour < 17 => 'afternoon',
                default => 'evening',
            };
        })->map(fn ($slots) => $slots->map(fn (Slot $s) => $s->start->format('H:i'))->values());

        return collect(['morning' => collect(), 'afternoon' => collect(), 'evening' => collect()])->merge($groups);
    }
}
