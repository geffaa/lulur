<?php

namespace App\Services;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Models\Reminder;
use App\Models\Tenant;
use Carbon\CarbonImmutable;
use Spatie\IcalendarGenerator\Components\Event;

/**
 * Confirmation + H-1 and 2-hour reminders (WhatsApp simulated in the demo,
 * email via the log mailer), quiet hours per tenant, review request after.
 */
class ReminderService
{
    public function scheduleFor(Booking $booking): void
    {
        $tenant = $booking->tenant;
        $start = CarbonImmutable::instance($booking->items()->first()->starts_at);
        $client = $booking->client;

        $plans = [
            ['kind' => 'confirmation', 'channel' => 'whatsapp', 'send_at' => now(), 'body' => $this->confirmationText($booking)],
            ['kind' => 'h1', 'channel' => 'whatsapp', 'send_at' => $this->respectQuietHours($start->subDay(), $tenant), 'body' => $this->reminderText($booking, 'tomorrow')],
            ['kind' => 'h2', 'channel' => 'whatsapp', 'send_at' => $this->respectQuietHours($start->subHours(2), $tenant), 'body' => $this->reminderText($booking, 'in 2 hours')],
            ['kind' => 'h1', 'channel' => 'email', 'send_at' => $this->respectQuietHours($start->subDay(), $tenant), 'body' => $this->reminderText($booking, 'tomorrow')],
        ];

        foreach ($plans as $plan) {
            if ($plan['send_at']->isPast() && $plan['kind'] !== 'confirmation') {
                continue;
            }
            Reminder::create([
                'tenant_id' => $booking->tenant_id,
                'booking_id' => $booking->id,
                'kind' => $plan['kind'],
                'channel' => $plan['channel'],
                'send_at' => $plan['send_at'],
                'status' => 'pending',
                'body' => $plan['body'],
            ]);
        }

        // form reminder when a required form is missing a signature
        $missingForm = $booking->items()->with('service.form')->get()
            ->contains(fn ($item) => $item->service->requires_form_id
                && ! $booking->formSubmissionsSigned());
        if ($missingForm) {
            Reminder::create([
                'tenant_id' => $booking->tenant_id,
                'booking_id' => $booking->id,
                'kind' => 'form',
                'channel' => 'whatsapp',
                'send_at' => $this->respectQuietHours($start->subDay(), $tenant),
                'status' => 'pending',
                'body' => "Please sign your treatment consent before your visit: ".route('booking.manage', ['code' => $booking->code, 't' => $booking->manageToken()]),
            ]);
        }
    }

    public function scheduleReview(Booking $booking): void
    {
        if (! $booking->client) {
            return;
        }

        Reminder::create([
            'tenant_id' => $booking->tenant_id,
            'booking_id' => $booking->id,
            'kind' => 'review',
            'channel' => 'whatsapp',
            'send_at' => now()->addHour(),
            'status' => 'pending',
            'body' => "Thank you for visiting {$booking->tenant->name}! We'd love a review: {$booking->tenant->settings['review_url']}",
        ]);
    }

    /** Send every due reminder. WhatsApp is simulated: recorded, not transmitted. */
    public function dispatchDue(): int
    {
        $due = Reminder::withoutGlobalScopes()
            ->where('status', 'pending')
            ->where('send_at', '<=', now())
            ->with('booking.tenant', 'booking.client')
            ->limit(100)
            ->get();

        foreach ($due as $reminder) {
            $booking = $reminder->booking;
            $status = match (true) {
                ! $booking || in_array($booking->status, [BookingStatus::Cancelled->value, BookingStatus::Expired->value]) => 'cancelled',
                $this->hasStopped($booking->client, $reminder->channel) => 'skipped',
                default => 'sent',
            };

            if ($status === 'sent') {
                logger()->info("lulur.{$reminder->channel}", [
                    'to' => $reminder->channel === 'whatsapp' ? ($booking->client->phone_e164 ?? '-') : ($booking->client->email ?? '-'),
                    'tenant' => $booking->tenant->slug,
                    'kind' => $reminder->kind,
                    'body' => $reminder->body,
                ]);
            }

            $reminder->update([
                'status' => $status,
                'sent_at' => $status === 'sent' ? now() : null,
            ]);
        }

        return $due->count();
    }

    /** No client on file, or a WhatsApp reminder for a client who replied STOP (email is unaffected). */
    protected function hasStopped(?\App\Models\Client $client, string $channel): bool
    {
        return $client === null || ($channel === 'whatsapp' && $client->whatsapp_stopped_at !== null);
    }

    protected function respectQuietHours(CarbonImmutable $at, Tenant $tenant): CarbonImmutable
    {
        $hours = $tenant->locations->first()?->opening_hours ?? [];
        $dayKey = strtolower($at->format('D'));
        $ranges = $hours[$dayKey] ?? [];

        if (empty($ranges)) {
            return $at; // closed days: leave as-is, the dispatcher skips closed days
        }

        [$from] = $ranges[0];

        return $at->lt($at->setTimeFromTimeString($from)) ? $at->setTimeFromTimeString($from) : $at;
    }

    protected function reminderText(Booking $booking, string $when): string
    {
        $item = $booking->items()->first();

        return "{$booking->tenant->name}: your {$item?->service->name} is {$when} at "
            .$item->starts_at->timezone($booking->location->timezone)->format('H:i').'. Reply to reschedule.';
    }

    protected function confirmationText(Booking $booking): string
    {
        $item = $booking->items()->first();
        $start = $item ? $item->starts_at->setTimezone($booking->location->timezone) : now();
        $deposit = $booking->deposit_paid > 0 ? " Deposit {$this->fmt($booking->deposit_paid, $booking->tenant->currency)} received." : '';

        return "{$booking->tenant->name}: your {$item?->service->name} on {$start->format('D j M, H:i')} is confirmed. Manage: "
            .route('booking.manage', ['code' => $booking->code, 't' => $booking->manageToken()]).$deposit;
    }

    protected function fmt(int $minor, string $currency): string
    {
        return \App\Support\Money::format($minor, $currency);
    }
}
