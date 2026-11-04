<?php

namespace App\Services;

use App\Enums\BookingStatus;
use App\Events\BookingChanged;
use App\Models\Addon;
use App\Models\Booking;
use App\Models\BookingItem;
use App\Models\BookingItemAddon;
use App\Models\BookingResource;
use App\Models\Client;
use App\Models\Location;
use App\Models\Payment;
use App\Models\Service;
use App\Models\ServiceVariant;
use App\Models\Staff;
use App\Models\Tenant;
use App\Support\Money;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingConflictException extends \RuntimeException
{
    public function __construct(public readonly string $reason)
    {
        parent::__construct($reason);
    }
}

class BookingService
{
    public function __construct(
        protected AvailabilityEngine $engine,
        protected PaymentService $payments,
        protected ReminderService $reminders,
    ) {
    }

    /**
     * Create a held booking (10-minute hold) with items + resources.
     * The exclusion constraints are the final guard: a race loses here.
     */
    public function createHold(
        Tenant $tenant,
        Location $location,
        Service $service,
        ServiceVariant $variant,
        array $addonIds = [],
        \Carbon\CarbonInterface|string $start = null,
        ?string $staffId = null,
        ?string $genderPref = null,
        string $source = 'online',
    ): Booking {
        $start = \Carbon\CarbonImmutable::parse($start, $location->timezone);
        $addonIds = array_values(array_unique($addonIds));
        $addons = $addonIds ? Addon::whereIn('id', $addonIds)->where('active', true)->get() : collect();

        // addons extend the reserved window
        $duration = $variant->duration_min + $addons->sum('duration_min');
        $window = $duration + $service->buffer_min;
        $needed = max(1, $service->therapists_needed);

        // slot must still exist (also re-checks gender pref + specific staff)
        [$staff, $room] = $this->engine->assign($service, $variant, $location, $start, $staffId, $genderPref);
        if (! $staff || ! $room) {
            throw new BookingConflictException('slot_gone');
        }
        $staff = $staff->take($needed)->values();

        // price: per-booking (couples) or per-guest; master surcharge only when a level is picked
        $linePrice = $variant->price;
        if ($staffId && ($level = $staff->first()?->level)) {
            $linePrice = $variant->priceForLevel($level);
        }
        $addonTotal = $addons->sum('price');
        $guests = max(1, $service->max_guests);
        $total = $service->price_basis === 'per_booking'
            ? $linePrice + $addonTotal
            : ($linePrice + $addonTotal) * $guests;

        $policy = $service->effectivePolicy($tenant);
        $depositDue = $policy['deposit_percent'] > 0
            ? $this->roundDeposit($total * $policy['deposit_percent'] / 100, $tenant->currency)
            : 0;

        try {
            $booking = DB::transaction(function () use ($tenant, $location, $service, $variant, $addons, $start, $duration, $staff, $room, $total, $depositDue, $policy, $source, $guests) {
            $booking = Booking::create([
                'tenant_id' => $tenant->id,
                'location_id' => $location->id,
                'code' => $this->nextCode($tenant),
                'status' => BookingStatus::Held->value,
                'source' => $source,
                'hold_expires_at' => now()->addMinutes(config('lulur.hold_minutes', 10)),
                'policy_snapshot' => $policy + ['captured_at' => now()->toIso8601String()],
                'total' => $total,
                'deposit_due' => $depositDue,
            ]);

            $item = BookingItem::create([
                'tenant_id' => $tenant->id,
                'booking_id' => $booking->id,
                'service_variant_id' => $variant->id,
                'service_id' => $service->id,
                'guests' => $guests,
                'starts_at' => $start,
                'ends_at' => $start->addMinutes($duration),
                'duration_min' => $duration,
                'price' => $total,
            ]);

            foreach ($addons as $addon) {
                BookingItemAddon::create([
                    'tenant_id' => $tenant->id,
                    'booking_item_id' => $item->id,
                    'addon_id' => $addon->id,
                    'name' => $addon->name,
                    'duration_min' => $addon->duration_min,
                    'price' => $addon->price,
                ]);
            }

            foreach ($staff as $s) {
                BookingResource::create([
                    'tenant_id' => $tenant->id,
                    'booking_item_id' => $item->id,
                    'staff_id' => $s->id,
                    'starts_at' => $start,
                    'ends_at' => $start->copy()->addMinutes($duration + $service->buffer_min),
                ]);
            }

            BookingResource::create([
                'tenant_id' => $tenant->id,
                'booking_item_id' => $item->id,
                'room_id' => $room->id,
                'starts_at' => $start,
                'ends_at' => $start->copy()->addMinutes($duration + $service->buffer_min),
            ]);

            return $booking;
            });
        } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
            // concurrent hold won the race for this slot
            throw new BookingConflictException('slot_gone');
        } catch (\Illuminate\Database\QueryException $e) {
            // exclusion constraint rejected the slot (23P01) — someone took it first
            if (str_contains($e->getMessage(), '23P01') || str_contains($e->getMessage(), 'booking_resources_')) {
                throw new BookingConflictException('slot_gone');
            }
            throw $e;
        }

        BookingChanged::dispatch($booking);

        return $booking;
    }

    /** Walk-in / phone booking from the front desk. Slot optional: "now". */
    public function createAdmin(
        Tenant $tenant,
        Location $location,
        Client $client,
        Service $service,
        ServiceVariant $variant,
        array $addonIds,
        \Carbon\CarbonInterface|string $start,
        string $source = 'walk_in',
        ?string $staffId = null,
        bool $skipDeposit = true,
    ): Booking {
        $booking = $this->createHold($tenant, $location, $service, $variant, $addonIds, $start, $staffId, null, $source);
        $booking->client_id = $client->id;
        $booking->save();
        $booking->refresh();

        $confirmed = $skipDeposit
            ? $this->confirmWithoutPayment($booking)
            : $booking;

        return $confirmed;
    }

    /** Front desk can confirm a walk-in directly (pay at checkout). */
    public function confirmWithoutPayment(Booking $booking): Booking
    {
        $booking->update([
            'status' => BookingStatus::Confirmed->value,
            'confirmed_at' => now(),
            'hold_expires_at' => null,
        ]);
        $this->reminders->scheduleFor($booking);
        BookingChanged::dispatch($booking);

        return $booking;
    }

    /** Contact + per-guest health answers + signature. Creates the client on first booking. */
    public function saveDetails(Booking $booking, array $data): Booking
    {
        $tenant = $booking->tenant;

        $client = $booking->client_id
            ? Client::find($booking->client_id)
            : Client::firstOrCreate(
                ['tenant_id' => $tenant->id, 'phone_e164' => $data['phone']],
                [
                    'name' => $data['name'],
                    'email' => $data['email'] ?? null,
                    'marketing_consent' => (bool) ($data['marketing_consent'] ?? false),
                    'avatar_hue' => \App\Support\Str::hue($data['phone'] ?? $data['name']),
                ]
            );

        $guests = collect($data['guests'] ?? []);
        $primary = $guests->first();
        if ($primary) {
            $client->fill([
                'pressure_pref' => $primary['pressure'] ?? $client->pressure_pref,
                'allergies' => $primary['allergies_note'] ?? $client->allergies,
                'avoid_areas' => $primary['avoid'] ?? $client->avoid_areas,
            ]);
            $client->save();
        }

        $booking->client_id = $client->id;
        $booking->save();

        $items = $booking->items()->with('service')->get();
        $guestList = $guests->values();

        // couples: assign names to the one item; single: name on the item
        $items->each(function (BookingItem $item, int $i) use ($guestList) {
            if ($guestList->isNotEmpty()) {
                $item->guest_name = $guestList[$i]['name'] ?? $item->guest_name;
                $item->guest_note = $guestList[$i]['note'] ?? null;
                $item->save();
            }
        });

        // one submission per guest who answered the form
        $form = $items->first()?->service->form;
        if ($form?->active_version_id) {
            foreach ($guestList as $guest) {
                if (empty($guest['answers']) && empty($guest['signature'])) {
                    continue;
                }
                \App\Models\FormSubmission::create([
                    'tenant_id' => $tenant->id,
                    'form_version_id' => $form->active_version_id,
                    'booking_id' => $booking->id,
                    'client_id' => $client->id,
                    'guest_name' => $guest['name'] ?? $client->name,
                    'answers' => $guest['answers'] ?? [],
                    'signature' => $guest['signature'] ?? null,
                    'signed_name' => $guest['name'] ?? $client->name,
                    // answered but not yet signed (the second guest of a couples booking signs later from the link)
                    'signed_at' => empty($guest['signature']) ? null : now(),
                    'expires_at' => now()->addMonths(config('lulur.form_validity_months', 12)),
                ]);
            }
        }

        return $booking->refresh();
    }

    /**
     * Move a booking (front desk drag or public reschedule). The exclusion
     * constraints reject conflicts; we pre-compute a friendly reason.
     */
    public function move(Booking $booking, \Carbon\CarbonInterface|string $newStart, ?array $staffIds = null, ?string $roomId = null): Booking
    {
        $location = $booking->location;
        $newStart = \Carbon\CarbonImmutable::parse($newStart, $location->timezone);
        $item = $booking->items()->with('service')->first();

        $currentStaff = $booking->resources()->whereNotNull('staff_id')->pluck('staff_id')->all();
        $currentRoom = $booking->resources()->whereNotNull('room_id')->value('room_id');
        $staffIds = $staffIds ?? $currentStaff;
        $roomId = $roomId ?? $currentRoom;

        $end = $newStart->addMinutes($item->duration_min);
        $resEnd = $newStart->addMinutes($item->duration_min + $item->service->buffer_min);

        // friendly conflict detection (constraint stays the hard guard)
        foreach ($staffIds as $sid) {
            $conflict = $this->staffConflict($booking, $sid, $newStart, $resEnd);
            if ($conflict) {
                throw new BookingConflictException($conflict);
            }
        }
        if ($roomConflict = $this->roomConflict($booking, $roomId, $newStart, $resEnd)) {
            throw new BookingConflictException($roomConflict);
        }

        DB::transaction(function () use ($booking, $item, $newStart, $end, $resEnd, $staffIds, $roomId) {
            $item->update(['starts_at' => $newStart, 'ends_at' => $end]);
            $booking->resources()->where('status', 'active')->update(['status' => 'released']);

            foreach ($staffIds as $sid) {
                BookingResource::create([
                    'tenant_id' => $booking->tenant_id,
                    'booking_item_id' => $item->id,
                    'staff_id' => $sid,
                    'starts_at' => $newStart,
                    'ends_at' => $resEnd,
                ]);
            }
            BookingResource::create([
                'tenant_id' => $booking->tenant_id,
                'booking_item_id' => $item->id,
                'room_id' => $roomId,
                'starts_at' => $newStart,
                'ends_at' => $resEnd,
            ]);
        });

        BookingChanged::dispatch($booking);

        return $booking->refresh();
    }

    protected function staffConflict(Booking $booking, string $staffId, $start, $end): ?string
    {
        $conflict = BookingResource::query()
            ->where('staff_id', $staffId)
            ->where('status', 'active')
            ->where('starts_at', '<', $end)
            ->where('ends_at', '>', $start)
            ->whereNotIn('booking_item_id', $booking->items()->select('id'))
            ->first();

        if ($conflict) {
            $name = Staff::find($staffId)?->display_name ?? 'that therapist';

            return "$name is busy at that time. Try another slot or swap the therapist.";
        }

        // shift coverage
        $staff = Staff::find($staffId);
        $shift = $staff?->shiftFor(\Carbon\CarbonImmutable::instance($start), $booking->location_id);
        if (! $shift || $start->lt($shift->starts_at) || $end->gt($shift->ends_at)) {
            return $staff?->display_name." isn't working at that time.";
        }

        return null;
    }

    protected function roomConflict(Booking $booking, string $roomId, $start, $end): ?string
    {
        $conflict = BookingResource::query()
            ->where('room_id', $roomId)
            ->where('status', 'active')
            ->where('starts_at', '<', $end)
            ->where('ends_at', '>', $start)
            ->whereNotIn('booking_item_id', $booking->items()->select('id'))
            ->first();

        if ($conflict) {
            $name = \App\Models\Room::find($roomId)?->name ?? 'that room';

            return "$name is booked at that time. Pick a free room instead.";
        }

        return null;
    }

    public function checkIn(Booking $booking): Booking
    {
        $booking->update(['status' => BookingStatus::CheckedIn->value, 'checked_in_at' => now()]);
        BookingChanged::dispatch($booking);

        return $booking;
    }

    public function startService(Booking $booking): Booking
    {
        $booking->update(['status' => BookingStatus::InService->value]);
        BookingChanged::dispatch($booking);

        return $booking;
    }

    public function complete(Booking $booking): Booking
    {
        $booking->update(['status' => BookingStatus::Completed->value, 'completed_at' => now()]);
        $this->reminders->scheduleReview($booking);
        BookingChanged::dispatch($booking);

        return $booking;
    }

    public function markNoShow(Booking $booking): Booking
    {
        $booking->update(['status' => BookingStatus::NoShow->value]);
        $booking->resources()->update(['status' => 'released']);
        BookingChanged::dispatch($booking);

        return $booking;
    }

    /** Cancellation honours the policy snapshot: inside the window → refund deposit. */
    public function cancel(Booking $booking, string $actor = 'client', bool $refundDeposit = true): Booking
    {
        $startsAt = $booking->items()->first()->starts_at;
        $windowHours = $booking->policy_snapshot['cancel_window_hours'] ?? 24;
        $insideWindow = $startsAt->gt(now()->addHours($windowHours));

        $booking->update(['status' => BookingStatus::Cancelled->value, 'cancelled_at' => now()]);
        $booking->resources()->update(['status' => 'released']);

        if ($refundDeposit && $insideWindow && $booking->deposit_paid > 0) {
            $this->payments->refundDeposit($booking, $actor);
        }

        activity()->performedOn($booking)->withProperties([
            'actor' => $actor,
            'inside_window' => $insideWindow,
        ])->log('booking.cancelled');

        BookingChanged::dispatch($booking);

        return $booking;
    }

    public function chargeNoShowFee(Booking $booking, string $actor): Payment
    {
        abort_unless($booking->status === BookingStatus::NoShow->value, 422, 'Booking is not a no-show.');

        $percent = $booking->policy_snapshot['no_show_fee_percent'] ?? 50;
        $amount = (int) round($booking->total * $percent / 100);

        activity()->performedOn($booking)->withProperties(['actor' => $actor, 'amount' => $amount, 'percent' => $percent])
            ->log('booking.no_show_fee');

        return $this->payments->offSessionCharge($booking, 'no_show_fee', $amount, $actor);
    }

    public function expireHolds(): int
    {
        $expired = Booking::query()
            ->withoutGlobalScopes()
            ->where('status', BookingStatus::Held->value)
            ->where('hold_expires_at', '<', now())
            ->get();

        $expired->each(function (Booking $b) {
            $b->update(['status' => BookingStatus::Expired->value]);
            $b->resources()->update(['status' => 'released']);
            BookingChanged::dispatch($b);
        });

        return $expired->count();
    }

    protected function roundDeposit(float $amount, string $currency): int
    {
        // IDR: friendly round thousands; others: whole currency units
        $step = $currency === 'IDR' ? 1000 : 100;

        return (int) (round($amount / $step) * $step);
    }

    protected function nextCode(Tenant $tenant): string
    {
        do {
            $code = $tenant->code_prefix.'-'.random_int(1000, 9999);
        } while (Booking::withoutGlobalScopes()->where('tenant_id', $tenant->id)->where('code', $code)->exists());

        return $code;
    }
}
