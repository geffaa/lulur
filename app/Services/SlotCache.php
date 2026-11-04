<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Location;
use App\Models\Service;
use App\Models\ServiceVariant;
use Illuminate\Support\Facades\Cache;

/**
 * Availability results are cached per (location, date) for 60 seconds and
 * invalidated whenever a booking, shift or time-off row changes. The truth is
 * still the exclusion constraint on INSERT — this cache only keeps the
 * booking page fast (NFR: slot calc < 300 ms).
 */
class SlotCache
{
    public const TTL_SECONDS = 60;

    public function remember(Location $location, string $date, callable $compute): mixed
    {
        $key = $this->key($location, $date);

        return Cache::remember($key, self::TTL_SECONDS, $compute);
    }

    public function key(Location $location, string $date): string
    {
        return sprintf('availability.%s.%s.v1', $location->id, $date);
    }

    public static function flushForLocation(int|string|null $locationId, ?string $date = null): void
    {
        if ($locationId === null) {
            return;
        }

        if ($date) {
            Cache::forget(sprintf('availability.%s.%s.v1', $locationId, $date));

            return;
        }

        // day unknown: flush the common window around today
        $today = today();
        for ($i = -1; $i <= 30; $i++) {
            Cache::forget(sprintf('availability.%s.%s.v1', $locationId, $today->copy()->addDays($i)->toDateString()));
        }
    }
}
