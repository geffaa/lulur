<?php

test('datetime bindings carry the timezone offset into the database', function () {
    $d = \Carbon\CarbonImmutable::parse('2026-11-01 09:00', 'America/New_York');
    $raw = $d->format('Y-m-d H:i:sP');
    expect($raw)->toBe('2026-11-01 09:00:00-05:00');

    $tenant = App\Models\Tenant::create([
        'id' => uid(), 'slug' => 'tztz', 'name' => 'TZ', 'currency' => 'USD',
        'default_timezone' => 'America/New_York', 'code_prefix' => 'TZT',
    ]);
    $loc = App\Models\Location::create([
        'id' => uid(), 'tenant_id' => $tenant->id, 'name' => 'L', 'slug' => 'l',
        'timezone' => 'America/New_York', 'opening_hours' => [],
    ]);
    $staff = App\Models\Staff::create([
        'id' => uid(), 'tenant_id' => $tenant->id, 'display_name' => 'S', 'gender' => 'male', 'level' => 'senior',
    ]);
    $shift = App\Models\Shift::create([
        'id' => uid(), 'tenant_id' => $tenant->id, 'staff_id' => $staff->id,
        'location_id' => $loc->id, 'starts_at' => $d, 'ends_at' => $d->addHours(1),
    ]);
    $stored = Illuminate\Support\Facades\DB::selectOne('SELECT starts_at::text AS t FROM shifts WHERE id = ?', [$shift->id])->t;
    expect($stored)->toBe('2026-11-01 14:00:00+00');
});
