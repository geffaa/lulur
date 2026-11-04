<?php

namespace App\Console\Commands;

use App\Services\BookingService;
use Illuminate\Console\Command;

class ExpireHolds extends Command
{
    protected $signature = 'lulur:expire-holds';

    protected $description = 'Release held bookings whose 10-minute hold expired';

    public function handle(BookingService $bookings): int
    {
        $count = $bookings->expireHolds();
        $this->info("Expired $count holds.");

        return self::SUCCESS;
    }
}
