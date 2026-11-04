<?php

use App\Models\Location;
use App\Models\Room;
use App\Models\Service;
use App\Models\ServiceVariant;
use App\Models\Shift;
use App\Models\Staff;
use App\Models\Tenant;
use App\Services\AvailabilityEngine;
use App\Services\DayAvailability;
use App\Support\TenantContext;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;

/**
 * Shared fixture: one tenant, one location, one massage service (single room,
 * 1 therapist, 15 min buffer) and one couples service (couples suite, 2
 * therapists, for 2). Two therapists + two rooms + one suite.
 */
beforeEach(function () {
    $this->setUpFixture();
});

afterEach(function () {
    Model::preventLazyLoading(false);
});

test('a couples slot exists only when the suite and two therapists are both free', function () {
    $day = slotsOn($this->couples120->id, $this->day);

    expect($day->slots)->not->toBeEmpty();

    // hold the 14:00 couples slot, then it must disappear
    $this->book($this->couples120, $this->day, '14:00', [$this->made, $this->wayan], $this->suite);

    $after = slotsOn($this->couples120->id, $this->day);
    expect($after->hasStart('14:00'))->toBeFalse()
        ->and($after->hasStart('11:00'))->toBeTrue(); // 11:00+120+15 ends 13:15 < 14:00
});

test('a single treatment does not appear when its therapist is busy, even if a room is free', function () {
    // couples 14:00 keeps Made and Wayan busy until 16:15 (120 + 15 buffer)
    $this->book($this->couples120, $this->day, '14:00', [$this->made, $this->wayan], $this->suite);

    // single massage at 14:00: Luh is free and Room 1 is free → still offered
    $single = slotsOn($this->massage60->id, $this->day);
    expect($single->hasStart('14:00'))->toBeTrue();

    // block BOTH single rooms and the suite 17:00–18:15 → no single slot at 17:00
    $this->book($this->massage60, $this->day, '17:00', [$this->made], $this->singleRoom);
    $this->book($this->massage60, $this->day, '17:00', [$this->wayan], $this->secondRoom);
    $this->book($this->massage60, $this->day, '17:00', [$this->luh], $this->suite);

    $single2 = slotsOn($this->massage60->id, $this->day);
    expect($single2->hasStart('17:00'))->toBeFalse()
        ->and($single2->hasStart('17:15'))->toBeFalse()
        ->and($single2->hasStart('18:15'))->toBeTrue(); // rooms freed again (with buffer)
});

test('buffer keeps a gap between back-to-back bookings', function () {
    // massage 10:00–11:00 with 15 min buffer: Made's own next slot starts 11:15,
    // while another therapist + free room can still take 11:00
    $this->book($this->massage60, $this->day, '10:00', [$this->made], $this->singleRoom);

    $madeSlots = slotsOn($this->massage60->id, $this->day, null, $this->made->id);
    expect($madeSlots->hasStart('11:00'))->toBeFalse()
        ->and($madeSlots->hasStart('11:15'))->toBeTrue();

    $anyone = slotsOn($this->massage60->id, $this->day);
    expect($anyone->hasStart('11:00'))->toBeTrue();
});

test('auto assignment picks the least-busy therapist and the tightest room', function () {
    $engine = app(AvailabilityEngine::class);
    $start = CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar');

    // load Made with a morning booking; Wayan stays free
    $this->book($this->massage60, $this->day, '09:00', [$this->made], $this->singleRoom);

    [$staff, $room] = $engine->assign($this->massage, $this->massage60, $this->location, $start);
    expect($staff->pluck('id'))->toContain($this->wayan->id)
        ->and($staff)->toHaveCount(1)
        // tightest fit: a single room, never the couples suite
        ->and($room->id)->toBeOneOf([$this->singleRoom->id, $this->secondRoom->id]);

    // couples: suite + 2 therapists, none of them Luh
    [$staff2, $room2] = $engine->assign($this->couples, $this->couples120, $this->location, $start);
    expect($room2->id)->toBe($this->suite->id)
        ->and($staff2)->toHaveCount(2);
});

test('gender preference filters candidate therapists', function () {
    // female therapists only: Made and Wayan are out; Luh alone can't take a couples slot
    $day = slotsOn($this->couples120->id, $this->day, 'female');
    expect($day->slots)->toBeEmpty();

    $single = slotsOn($this->massage60->id, $this->day, 'female');
    expect($single->hasStart('10:00'))->toBeTrue();
});

test('slots respect opening hours and shifts', function () {
    // shift 11:00–19:00 only: no slot before 11:00 nor after 18:00 (60+15 window)
    foreach ([test()->made, test()->wayan, test()->luh] as $staff) {
        App\Models\Shift::query()->where('staff_id', $staff->id)->delete();
        Shift::create([
            'id' => uid(), 'tenant_id' => $this->tenant->id,
            'staff_id' => $staff->id, 'location_id' => $this->location->id,
            'starts_at' => CarbonImmutable::parse($this->day.' 11:00', 'Asia/Makassar'),
            'ends_at' => CarbonImmutable::parse($this->day.' 19:00', 'Asia/Makassar'),
        ]);
    }

    $day = slotsOn($this->massage60->id, $this->day);
    $starts = $day->slots->map(fn ($s) => $s->start->format('H:i'));

    expect($starts->contains('10:00'))->toBeFalse()
        ->and($starts->contains('11:00'))->toBeTrue()
        ->and($starts->contains('18:00'))->toBeTrue()
        ->and($starts->contains('18:15'))->toBeFalse();
});

test('no slots are offered on holidays', function () {
    $this->location->update(['holidays' => [$this->day]]);
    expect(slotsOn($this->massage60->id, $this->day)->slots)->toBeEmpty();
});
