<?php

namespace App\Services;

use App\Models\Staff;
use App\Models\Room;
use Carbon\CarbonImmutable;

/** A concrete bookable start: window, the room that fits, the free therapists. */
class Slot
{
    /**
     * @param Staff[] $staff
     */
    public function __construct(
        public readonly CarbonImmutable $start,
        public readonly CarbonImmutable $end,
        public readonly Room $room,
        public readonly array $staff,
    ) {
    }
}
