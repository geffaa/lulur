<?php

namespace App\Services;

use App\Models\Booking;
use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;

class IcsService
{
    public function forBooking(Booking $booking): string
    {
        $item = $booking->items()->with('service')->first();
        $start = $item?->starts_at ?? now();
        $end = $item?->ends_at ?? now()->addHour();

        $calendar = Calendar::create($booking->tenant->name)
            ->event(Event::create()
                ->name(($item?->service?->name ?? 'Treatment').' at '.$booking->tenant->name)
                ->description("Booking {$booking->code}")
                ->uniqueIdentifier($booking->code.'@'.$booking->tenant->slug)
                ->startsAt($start)
                ->endsAt($end)
                ->address($booking->location->address ?? $booking->location->name)
                ->organizer('booking@'.$booking->tenant->slug.'.'.parse_url(config('lulur.app_domain'), PHP_URL_HOST ?: 'lulur.app'), $booking->tenant->name)
            );

        return $calendar->get();
    }
}
