<?php

namespace App\Console\Commands;

use App\Models\Location;
use App\Models\Room;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceVariant;
use App\Models\Shift;
use App\Models\Staff;
use App\Models\Tenant;
use App\Support\TenantContext;
use Carbon\CarbonImmutable;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/** Test support: build a minimal tenant for the concurrent-hold race test. */
class PrepareRace extends Command
{
    protected $signature = 'lulur:prepare-race';

    protected $description = 'Create the minimal race-test tenant';

    public function handle(): int
    {
        Tenant::withoutGlobalScopes()->where('slug', 'race')->delete();
        DB::table('tenants')->where('slug', 'race')->delete();

        $tenant = Tenant::create([
            'id' => $this->uid(), 'slug' => 'race', 'name' => 'Race Spa',
            'currency' => 'IDR', 'default_timezone' => 'Asia/Makassar', 'code_prefix' => 'RCE',
        ]);
        app(TenantContext::class)->set($tenant);

        $location = Location::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Main', 'slug' => 'main',
            'timezone' => 'Asia/Makassar',
            'opening_hours' => array_fill_keys(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], [['09:00', '21:00']]),
        ]);
        $room = Room::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $location->id,
            'name' => 'Room 1', 'room_type' => 'single', 'capacity' => 1,
        ]);
        $staff = Staff::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id,
            'display_name' => 'Only', 'gender' => 'male', 'level' => 'senior',
        ]);
        $category = ServiceCategory::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Massage']);
        $service = Service::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'category_id' => $category->id,
            'name' => 'Massage', 'slug' => 'massage', 'buffer_min' => 15, 'room_type' => 'single',
        ]);
        $variant = ServiceVariant::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $service->id,
            'duration_min' => 60, 'price' => 100000,
        ]);
        DB::table('staff_skills')->insert(['staff_id' => $staff->id, 'service_id' => $service->id, 'tenant_id' => $tenant->id]);
        $day = CarbonImmutable::today('Asia/Makassar')->next('Mon');
        Shift::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'staff_id' => $staff->id, 'location_id' => $location->id,
            'starts_at' => $day->setTime(9, 0), 'ends_at' => $day->setTime(21, 0),
        ]);

        $this->info("race tenant ready: variant={$variant->id}");

        return self::SUCCESS;
    }

    private function uid(): string
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}
