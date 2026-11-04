<?php

use App\Services\BookingService;

beforeEach(function () {
    $this->setUpFixture();
    Illuminate\Support\Facades\DB::table('staff_skills')->whereIn('staff_id', [$this->wayan->id, $this->luh->id])->delete();
});

test('deposit math follows the tenant policy snapshot', function () {
    $variant = App\Models\ServiceVariant::find($this->massage60->id); // Rp 100.000
    $booking = app(BookingService::class)->createHold(
        tenant: $this->tenant,
        location: $this->location,
        service: $variant->service,
        variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar'),
    );

    expect($booking->total)->toBe(100000)
        ->and($booking->deposit_due)->toBe(30000) // 30%
        ->and($booking->policy_snapshot['deposit_percent'])->toBe(30)
        ->and($booking->policy_snapshot['cancel_window_hours'])->toBe(24);
});

test('a policy change does not affect bookings already held (snapshot)', function () {
    $variant = App\Models\ServiceVariant::find($this->massage60->id);
    $booking = app(BookingService::class)->createHold(
        tenant: $this->tenant,
        location: $this->location,
        service: $variant->service,
        variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar'),
    );

    // owner raises the deposit to 50%
    $settings = $this->tenant->settings ?? [];
    $settings['booking_policy'] = ['deposit_percent' => 50, 'cancel_window_hours' => 48, 'no_show_fee_percent' => 50, 'saved_card_mode' => 'optional'];
    $this->tenant->update(['settings' => $settings]);

    $later = app(BookingService::class)->createHold(
        tenant: $this->tenant->refresh(),
        location: $this->location,
        service: $variant->service,
        variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 13:00', 'Asia/Makassar'),
    );

    expect($booking->refresh()->policy_snapshot['deposit_percent'])->toBe(30) // untouched
        ->and($booking->deposit_due)->toBe(30000)
        ->and($later->policy_snapshot['deposit_percent'])->toBe(50)
        ->and($later->deposit_due)->toBe(50000);
});

test('cancellation inside the window refunds the deposit, later keeps it', function () {
    $variant = App\Models\ServiceVariant::find($this->massage60->id);
    $service = app(BookingService::class);
    $payments = app(App\Services\PaymentService::class);

    // "now" is two days before the fixture's Monday
    $this->travelTo(\Carbon\CarbonImmutable::parse($this->day)->subDays(2)->setTime(10, 0));

    $inside = $service->createHold(
        tenant: $this->tenant, location: $this->location,
        service: $variant->service, variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar'),
    );
    $payment = $payments->createForBooking($inside, 'deposit', 'qris');
    $payments->markSucceeded($payment->idempotency_key);
    $inside->refresh();

    $service->cancel($inside->refresh(), 'client');
    $inside->refresh();
    expect($inside->status)->toBe('cancelled')
        ->and($inside->payments()->where('kind', 'refund')->exists())->toBeTrue();

    // second booking for Monday 13:00; cancel on Monday 09:00 → inside 24 h? No:
    // 13:00 < 09:00+24 h, so the deposit is kept per the snapshot
    $near = $service->createHold(
        tenant: $this->tenant, location: $this->location,
        service: $variant->service, variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 13:00', 'Asia/Makassar'),
    );
    $p2 = $payments->createForBooking($near, 'deposit', 'qris');
    $payments->markSucceeded($p2->idempotency_key);
    $near->refresh();

    $this->travelTo(\Carbon\CarbonImmutable::parse($this->day)->setTime(9, 0));
    $service->cancel($near->refresh(), 'client');
    $near->refresh();
    expect($near->status)->toBe('cancelled')
        ->and($near->payments()->where('kind', 'refund')->exists())->toBeFalse();
});

test('checkout with a tip splits it equally over the assigned therapists', function () {
    // couples booking: two therapists (re-add the skills removed in beforeEach)
    foreach ([$this->wayan, $this->luh] as $staff) {
        Illuminate\Support\Facades\DB::table('staff_skills')->insert([
            'staff_id' => $staff->id, 'service_id' => $this->couples->id, 'tenant_id' => $this->tenant->id,
        ]);
    }
    $variant = App\Models\ServiceVariant::find($this->couples120->id);
    $booking = app(BookingService::class)->createHold(
        tenant: $this->tenant,
        location: $this->location,
        service: $variant->service,
        variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 14:00', 'Asia/Makassar'),
    );

    app(App\Services\PaymentService::class)->checkout($booking, 100000);

    $tips = $booking->tips()->get();
    expect($tips)->toHaveCount(2)
        ->and($tips->sum('amount'))->toBe(100000)
        ->and($booking->refresh()->tip_total)->toBe(100000);
});

test('no-show fee is charged off-session from the saved card', function () {
    $variant = App\Models\ServiceVariant::find($this->massage60->id);
    $service = app(BookingService::class);
    $booking = $service->createHold(
        tenant: $this->tenant, location: $this->location,
        service: $variant->service, variant: $variant,
        start: \Carbon\CarbonImmutable::parse($this->day.' 10:00', 'Asia/Makassar'),
    );
    $client = App\Models\Client::create([
        'id' => uid(), 'tenant_id' => $this->tenant->id, 'name' => 'Card Client',
        'saved_card' => ['brand' => 'Visa', 'last4' => '4242'],
    ]);
    $booking->update(['client_id' => $client->id]);
    $service->markNoShow($booking->refresh());

    $payment = $service->chargeNoShowFee($booking, 'Manager Mia');

    expect($payment->kind)->toBe('no_show_fee')
        ->and($payment->amount)->toBe(50000) // 50% of total
        ->and($payment->status)->toBe('succeeded');
});
