<?php

namespace App\Listeners;

use App\Events\BookingChanged;
use App\Services\SlotCache;
use Illuminate\Contracts\Queue\ShouldQueue;

class FlushAvailabilityCache implements ShouldQueue
{
    public function __construct(protected SlotCache $cache)
    {
    }

    public function handle(BookingChanged $event): void
    {
        SlotCache::flushForLocation($event->booking->location_id);
    }
}
