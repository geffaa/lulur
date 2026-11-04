<?php

use App\Models\Booking;
use App\Models\Client;
use App\Models\Reminder;
use App\Models\TimeOff;
use App\Services\PaymentService;
use App\Services\ReminderService;
use Carbon\CarbonImmutable;

beforeEach(function () {
    $this->setUpFixture();
});

test('time off removes the therapist from slots and does not break availability', function () {
    $tz = $this->location->timezone;
    foreach ([$this->made, $this->wayan, $this->luh] as $staff) {
        TimeOff::create([
            'tenant_id' => $this->tenant->id, 'staff_id' => $staff->id, 'reason' => 'Ceremony',
            'period' => [CarbonImmutable::parse($this->day.' 10:00', $tz), CarbonImmutable::parse($this->day.' 12:00', $tz)],
        ]);
    }

    $day = slotsOn($this->massage60->id, $this->day);

    // 09:00 (+60 min +15 buffer) runs into the leave; 12:00 is the first clean start
    expect($day->hasStart('09:00'))->toBeFalse()
        ->and($day->hasStart('10:30'))->toBeFalse()
        ->and($day->hasStart('11:30'))->toBeFalse()
        ->and($day->hasStart('12:00'))->toBeTrue();
});

test('a replayed payment webhook confirms the booking once and changes nothing the second time', function () {
    $booking = $this->book($this->massage60, $this->day, '10:00', [$this->made], $this->singleRoom);
    $booking->forceFill(['status' => 'held', 'deposit_due' => 30000, 'deposit_paid' => 0])->save();
    $payments = app(PaymentService::class);
    $payment = $payments->createForBooking($booking, 'deposit', 'qris');

    $first = $payments->markSucceeded($payment->idempotency_key, 'mt_123');
    $paidAt = $first->fresh()->paid_at;
    $replay = $payments->markSucceeded($payment->idempotency_key, 'mt_999');

    $booking->refresh();
    expect($booking->status)->toBe('confirmed')
        ->and($booking->deposit_paid)->toBe(30000)           // not doubled by the replay
        ->and($replay->fresh()->provider_ref)->toBe('mt_123') // first provider ref wins
        ->and($replay->fresh()->paid_at->equalTo($paidAt))->toBeTrue();
});

test('replying STOP stops WhatsApp reminders but not email', function () {
    $booking = $this->book($this->massage60, $this->day, '10:00', [$this->made], $this->singleRoom);
    $client = Client::create([
        'id' => $this->uid(), 'tenant_id' => $this->tenant->id, 'name' => 'Ayu',
        'phone_e164' => '+6281234567890', 'email' => 'ayu@example.test',
    ]);
    $booking->forceFill(['client_id' => $client->id])->save();
    foreach (['whatsapp', 'email'] as $channel) {
        Reminder::create([
            'tenant_id' => $this->tenant->id, 'booking_id' => $booking->id, 'kind' => 'h1',
            'channel' => $channel, 'send_at' => now()->subMinute(), 'status' => 'pending', 'body' => 'See you tomorrow',
        ]);
    }

    // Cloud API format: number without '+'
    $this->postJson('http://'.$this->tenant->slug.'.localhost/webhooks/whatsapp', ['entry' => [['changes' => [['value' => ['messages' => [
        ['from' => '6281234567890', 'text' => ['body' => ' stop ']],
    ]]]]]]])->assertOk();

    app(ReminderService::class)->dispatchDue();

    expect(Reminder::where('channel', 'whatsapp')->value('status'))->toBe('skipped')
        ->and(Reminder::where('channel', 'email')->value('status'))->toBe('sent');
});

test('grouped slots always expose morning, afternoon and evening, even when a part of the day is empty', function () {
    // only the evening is bookable: everyone is off until 17:00
    $tz = $this->location->timezone;
    foreach ([$this->made, $this->wayan, $this->luh] as $staff) {
        TimeOff::create([
            'tenant_id' => $this->tenant->id, 'staff_id' => $staff->id, 'reason' => 'Off',
            'period' => [CarbonImmutable::parse($this->day.' 00:00', $tz), CarbonImmutable::parse($this->day.' 17:00', $tz)],
        ]);
    }

    $grouped = slotsOn($this->massage60->id, $this->day)->groupedByPartOfDay()->toArray();

    expect(array_keys($grouped))->toEqualCanonicalizing(['morning', 'afternoon', 'evening'])
        ->and($grouped['morning'])->toBe([])
        ->and($grouped['evening'])->not->toBeEmpty();
});

test('checkout details create the client, name the guests and store one signed form per guest', function () {
    $this->setUpFixture();
    $form = App\Models\Form::create(['id' => $this->uid(), 'tenant_id' => $this->tenant->id, 'name' => 'Health']);
    $version = App\Models\FormVersion::create(['id' => $this->uid(), 'tenant_id' => $this->tenant->id, 'form_id' => $form->id, 'version' => 1, 'fields' => []]);
    $form->update(['active_version_id' => $version->id]);
    $this->massage->update(['requires_form_id' => $form->id]);

    $booking = $this->book($this->massage60, $this->day, '10:00', [$this->made], $this->singleRoom);
    $booking->forceFill(['status' => 'held'])->save();

    app(App\Services\BookingService::class)->saveDetails($booking, [
        'name' => 'Emma Saputra', 'phone' => '+447700900418', 'email' => 'emma@example.test',
        'guests' => [['name' => 'Emma Saputra', 'answers' => ['q1' => 'no'], 'signature' => 'M0 0L10 10']],
    ]);

    $booking->refresh();
    expect($booking->client_id)->not->toBeNull()
        ->and($booking->items()->first()->guest_name)->toBe('Emma Saputra')
        ->and($booking->formSubmissions()->whereNotNull('signed_at')->count())->toBe(1)
        ->and($booking->formMissing())->toBeFalse();
});
