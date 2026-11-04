<?php

use App\Models\Booking;
use App\Models\ServiceVariant;
use App\Services\BookingConflictException;
use App\Services\BookingService;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
    $this->setUpFixture();
    // single candidate: only Made can perform the service, only Room 1 fits —
    // every extra slot capacity is removed so "the slot" is one thing
    DB::table('staff_skills')->whereIn('staff_id', [$this->wayan->id, $this->luh->id])->delete();
});

test('the second hold on the same slot is refused by the engine', function () {
    $variant = ServiceVariant::find($this->massage60->id);
    $service = app(BookingService::class);

    $start = \Carbon\CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar');

    $first = $service->createHold(tenant: $this->tenant, location: $this->location, service: $variant->service, variant: $variant, start: $start);
    $second = null;
    try {
        $second = $service->createHold(tenant: $this->tenant, location: $this->location, service: $variant->service, variant: $variant, start: $start);
    } catch (BookingConflictException) {
    }

    expect($first->status)->toBe('held')
        ->and($second)->toBeNull();
});

test('the exclusion constraint rejects overlapping room inserts even without the engine', function () {
    $variant = ServiceVariant::find($this->massage60->id);
    $row = function () use ($variant) {
        $booking = Booking::create([
            'id' => uid(), 'tenant_id' => $this->tenant->id, 'location_id' => $this->location->id,
            'code' => 'TST-'.random_int(1000, 9999), 'status' => 'held', 'source' => 'online',
            'policy_snapshot' => [], 'total' => $variant->price,
        ]);
        $item = App\Models\BookingItem::create([
            'id' => uid(), 'tenant_id' => $this->tenant->id, 'booking_id' => $booking->id,
            'service_variant_id' => $variant->id, 'service_id' => $variant->service_id,
            'starts_at' => \Carbon\CarbonImmutable::parse($this->day.' 11:00', 'Asia/Makassar'),
            'ends_at' => \Carbon\CarbonImmutable::parse($this->day.' 12:00', 'Asia/Makassar'),
            'duration_min' => 60, 'price' => $variant->price, 'guests' => 1,
        ]);
        App\Models\BookingResource::create([
            'id' => uid(), 'tenant_id' => $this->tenant->id, 'booking_item_id' => $item->id,
            'room_id' => $this->singleRoom->id,
            'starts_at' => \Carbon\CarbonImmutable::parse($this->day.' 11:00', 'Asia/Makassar'),
            'ends_at' => \Carbon\CarbonImmutable::parse($this->day.' 12:00', 'Asia/Makassar'),
        ]);
    };

    $row();
    $rejected = false;
    try {
        $row(); // overlapping room window — the constraint must refuse
    } catch (Illuminate\Database\QueryException $e) {
        $rejected = str_contains($e->getMessage(), '23P01');
    }

    expect($rejected)->toBeTrue();
});

test('10 concurrent hold attempts on one slot produce exactly one booking', function () {
    // dedicated tenant for the worker processes
    Artisan::call('migrate:fresh', ['--force' => true]);
    Artisan::call('lulur:prepare-race');

    $script = <<<'PHP'
        <?php
        require $argv[1].'/vendor/autoload.php';
        $app = require $argv[1].'/bootstrap/app.php';
        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        $tenant = App\Models\Tenant::where('slug', 'race')->first();
        app(App\Support\TenantContext::class)->set($tenant);
        $variant = App\Models\ServiceVariant::where('tenant_id', $tenant->id)->first();
        try {
            app(App\Services\BookingService::class)->createHold(
                tenant: $tenant,
                location: App\Models\Location::where('tenant_id', $tenant->id)->first(),
                service: $variant->service,
                variant: $variant,
                start: Carbon\CarbonImmutable::parse($argv[2].' 10:00', 'Asia/Makassar'),
            );
            file_put_contents($argv[3], '1', FILE_APPEND);
        } catch (Throwable $e) {
            file_put_contents($argv[3], '0', FILE_APPEND);
        }
        PHP;
    file_put_contents('/tmp/lulur-race.php', $script);

    $countFile = '/tmp/lulur-race-count';
    @unlink($countFile);
    $startArg = $this->day;

    // 10 worker processes race for the slot at the same moment
    $commands = [];
    for ($i = 0; $i < 10; $i++) {
        $commands[] = sprintf(
            'php /tmp/lulur-race.php %s %s %s >> /tmp/lulur-race.log 2>&1',
            escapeshellarg(base_path()),
            escapeshellarg($startArg),
            escapeshellarg($countFile),
        );
    }

    // joined with '&' + wait so the workers genuinely overlap (';' would run them one after another)
    \Symfony\Component\Process\Process::fromShellCommandline(implode(' & ', $commands).' & wait')
        ->setTimeout(120)
        ->mustRun();

    $results = file_exists($countFile) ? str_split(trim(file_get_contents($countFile))) : [];
    $wins = array_sum($results);
    $attempts = count($results);

    expect($attempts)->toBe(10)
        ->and($wins)->toBe(1)
        ->and(App\Models\Booking::withoutGlobalScopes()->count())->toBe(1);
});
