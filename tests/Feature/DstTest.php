<?php

test('bookings across the US DST transition keep the wall-clock time', function () {
    // Freeze the clock: the engine never offers past slots, so a fixed 2026-11-01 date must stay in the future.
    \Carbon\CarbonImmutable::setTestNow('2026-10-30 12:00:00');
    \Carbon\Carbon::setTestNow('2026-10-30 12:00:00');
    // Juniper (America/New_York). DST ends 2026-11-01 — the day repeats 01:00–02:00 EDT→EST.
    $tenant = App\Models\Tenant::create([
        'id' => uid(), 'slug' => 'dst', 'name' => 'DST Spa',
        'currency' => 'USD', 'default_timezone' => 'America/New_York', 'code_prefix' => 'DST',
    ]);
    app(App\Support\TenantContext::class)->set($tenant);
    $location = App\Models\Location::create([
        'id' => uid(), 'tenant_id' => $tenant->id, 'name' => 'CC', 'slug' => 'cc',
        'timezone' => 'America/New_York',
        'opening_hours' => array_fill_keys(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], [['09:00', '21:00']]),
    ]);
    $room = App\Models\Room::create(['id' => uid(), 'tenant_id' => $tenant->id, 'location_id' => $location->id, 'name' => 'R', 'room_type' => 'single']);
    $staff = App\Models\Staff::create(['id' => uid(), 'tenant_id' => $tenant->id, 'display_name' => 'D', 'gender' => 'female', 'level' => 'senior']);
    $category = App\Models\ServiceCategory::create(['id' => uid(), 'tenant_id' => $tenant->id, 'name' => 'M']);
    $service = App\Models\Service::create(['id' => uid(), 'tenant_id' => $tenant->id, 'category_id' => $category->id, 'name' => 'M', 'slug' => 'm', 'buffer_min' => 0, 'room_type' => 'single']);
    $variant = App\Models\ServiceVariant::create(['id' => uid(), 'tenant_id' => $tenant->id, 'service_id' => $service->id, 'duration_min' => 60, 'price' => 9000]);
    Illuminate\Support\Facades\DB::table('staff_skills')->insert(['staff_id' => $staff->id, 'service_id' => $service->id, 'tenant_id' => $tenant->id]);
    App\Models\Shift::create([
        'id' => uid(), 'tenant_id' => $tenant->id, 'staff_id' => $staff->id, 'location_id' => $location->id,
        'starts_at' => \Carbon\CarbonImmutable::parse('2026-11-01 07:00', 'America/New_York'),
        'ends_at' => \Carbon\CarbonImmutable::parse('2026-11-01 21:00', 'America/New_York'),
    ]);

    $booking = app(App\Services\BookingService::class)->createHold(
        tenant: $tenant, location: $location, service: $service, variant: $variant,
        start: \Carbon\CarbonImmutable::parse('2026-11-01 09:00', 'America/New_York'),
    );
    $start = $booking->items()->first()->starts_at;

    // DST ends 2 AM local on Nov 1 2026, so 09:00 is already EST (UTC-5) = 14:00 UTC
    expect($start->format('H:i'))->toBe('14:00')
        // and the local wall clock reads 09:00 in the location timezone
        ->and($start->timezone('America/New_York')->format('H:i'))->toBe('09:00')
        // a week later the offset is EST (UTC-5): 09:00 local = 14:00 UTC
        ->and(\Carbon\CarbonImmutable::parse('2026-11-08 09:00', 'America/New_York')->timezone('UTC')->format('H:i'))->toBe('14:00');
});

test('the hold stores the true instant regardless of the DST offset', function () {
    \Carbon\CarbonImmutable::setTestNow('2026-10-30 12:00:00');
    \Carbon\Carbon::setTestNow('2026-10-30 12:00:00');
    $tenant = App\Models\Tenant::create([
        'id' => uid(), 'slug' => 'dst2', 'name' => 'DST2',
        'currency' => 'USD', 'default_timezone' => 'America/New_York', 'code_prefix' => 'DS2',
    ]);
    app(App\Support\TenantContext::class)->set($tenant);
    $location = App\Models\Location::create([
        'id' => uid(), 'tenant_id' => $tenant->id, 'name' => 'CC', 'slug' => 'cc',
        'timezone' => 'America/New_York',
        'opening_hours' => array_fill_keys(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], [['09:00', '21:00']]),
    ]);
    $room = App\Models\Room::create(['id' => uid(), 'tenant_id' => $tenant->id, 'location_id' => $location->id, 'name' => 'R', 'room_type' => 'single']);
    $staff = App\Models\Staff::create(['id' => uid(), 'tenant_id' => $tenant->id, 'display_name' => 'D', 'gender' => 'female', 'level' => 'senior']);
    $category = App\Models\ServiceCategory::create(['id' => uid(), 'tenant_id' => $tenant->id, 'name' => 'M']);
    $service = App\Models\Service::create(['id' => uid(), 'tenant_id' => $tenant->id, 'category_id' => $category->id, 'name' => 'M', 'slug' => 'm', 'buffer_min' => 0, 'room_type' => 'single']);
    $variant = App\Models\ServiceVariant::create(['id' => uid(), 'tenant_id' => $tenant->id, 'service_id' => $service->id, 'duration_min' => 60, 'price' => 9000]);
    Illuminate\Support\Facades\DB::table('staff_skills')->insert(['staff_id' => $staff->id, 'service_id' => $service->id, 'tenant_id' => $tenant->id]);
    App\Models\Shift::create([
        'id' => uid(), 'tenant_id' => $tenant->id, 'staff_id' => $staff->id, 'location_id' => $location->id,
        'starts_at' => \Carbon\CarbonImmutable::parse('2026-11-01 07:00', 'America/New_York'),
        'ends_at' => \Carbon\CarbonImmutable::parse('2026-11-01 21:00', 'America/New_York'),
    ]);

    $booking = app(App\Services\BookingService::class)->createHold(
        tenant: $tenant, location: $location, service: $service, variant: $variant,
        start: \Carbon\CarbonImmutable::parse('2026-11-01 09:00', 'America/New_York'),
    );
    $item = $booking->items()->first();
    $raw = Illuminate\Support\Facades\DB::selectOne('SELECT starts_at::text AS t FROM booking_items WHERE id = ?', [$item->id])->t;

    expect($raw)->toBe('2026-11-01 14:00:00+00');
});
