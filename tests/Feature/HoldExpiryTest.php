<?php

use App\Console\Commands\ExpireHolds;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    $this->setUpFixture();
    Illuminate\Support\Facades\DB::table('staff_skills')->whereIn('staff_id', [$this->wayan->id, $this->luh->id])->delete();
});

test('an expired hold is marked expired and its resources are released', function () {
    $variant = App\Models\ServiceVariant::find($this->massage60->id);
    $booking = app(BookingService::class)->createHold(
        tenant: $this->tenant,
        location: $this->location,
        service: $variant->service,
        variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar'),
    );

    expect($booking->status)->toBe('held')
        ->and($booking->hold_expires_at)->not->toBeNull();

    // time travel past the 10-minute hold
    $this->travel(11)->minutes();

    Artisan::call(ExpireHolds::class);

    $booking->refresh();
    expect($booking->status)->toBe('expired')
        ->and($booking->resources()->where('status', 'active')->count())->toBe(0)
        // the slot is bookable again
        ->and(slotsOn($variant->id, $this->day)->hasStart('10:00'))->toBeTrue();
});

test('a fresh hold is not expired early', function () {
    $variant = App\Models\ServiceVariant::find($this->massage60->id);
    $booking = app(BookingService::class)->createHold(
        tenant: $this->tenant,
        location: $this->location,
        service: $variant->service,
        variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar'),
    );

    Artisan::call(ExpireHolds::class);

    expect($booking->refresh()->status)->toBe('held');
});

test('deposit success confirms the booking and schedules reminders', function () {
    $variant = App\Models\ServiceVariant::find($this->massage60->id);
    $booking = app(BookingService::class)->createHold(
        tenant: $this->tenant,
        location: $this->location,
        service: $variant->service,
        variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar'),
    );

    $payments = app(App\Services\PaymentService::class);
    $payment = $payments->createForBooking($booking, 'deposit', 'card');
    $payments->markSucceeded($payment->idempotency_key, 'pi_123');
    $payments->markSucceeded($payment->idempotency_key, 'pi_123'); // webhook replay

    $booking->refresh();
    expect($booking->status)->toBe('confirmed')
        ->and($booking->deposit_paid)->toBe($booking->deposit_due)
        ->and($booking->payments()->where('kind', 'deposit')->count())->toBe(1) // idempotent
        ->and($booking->reminders()->count())->toBeGreaterThan(0);
});
