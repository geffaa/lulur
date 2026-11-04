<?php

namespace App\Providers;

use App\Events\BookingChanged;
use App\Listeners\FlushAvailabilityCache;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // one instance per request: middleware sets it, everything else reads it
        $this->app->singleton(\App\Support\TenantContext::class);

        // Postgres connections write tz-aware instants (see UtcAwarePostgresGrammar)
        \Illuminate\Database\Connection::resolverFor('pgsql', function ($connection, $database, $prefix, $config) {
            return new \App\Database\UtcAwarePostgresConnection($connection, $database, $prefix, $config);
        });
    }

    public function boot(): void
    {
        Event::listen(BookingChanged::class, FlushAvailabilityCache::class);

        $this->app->booted(function () {
            $schedule = $this->app->make(Schedule::class);
            // hold 10 menit: relepas slot tepat waktu
            $schedule->command('lulur:expire-holds')->everyMinute();
            // pengingat H-1 dan 2 jam + konfirmasi
            $schedule->command('lulur:send-reminders')->everyMinute();
        });
    }
}
