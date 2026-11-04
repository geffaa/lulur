<?php

namespace Tests;

use App\Models\Booking;
use App\Models\BookingItem;
use App\Models\BookingResource;
use App\Models\Location;
use App\Models\Room;
use App\Models\Service;
use App\Models\ServiceVariant;
use App\Models\Shift;
use App\Models\Staff;
use App\Models\Tenant;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase
{
    protected function uid(): string
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }


    /**
     * Minimal single-tenant fixture: location, rooms, three staff, two
     * services (60-min single + 120-min couples), skills and next-Monday shifts.
     */
    protected function setUpFixture(): void
    {
        $this->tenant = Tenant::create([
            'id' => $this->uid(),
            'slug' => 'test-'.substr($this->uid(), 0, 8),
            'name' => 'Test Spa',
            'currency' => 'IDR',
            'default_timezone' => 'Asia/Makassar',
            'code_prefix' => 'TST',
        ]);
        app(\App\Support\TenantContext::class)->set($this->tenant);

        $this->location = Location::create([
            'id' => $this->uid(),
            'tenant_id' => $this->tenant->id,
            'name' => 'Main',
            'slug' => 'main',
            'timezone' => 'Asia/Makassar',
            'opening_hours' => array_fill_keys(
                ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                [['09:00', '21:00']]
            ),
        ]);

        $this->singleRoom = Room::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id, 'location_id' => $this->location->id,
            'name' => 'Room 1', 'room_type' => 'single', 'capacity' => 1, 'sort' => 1,
        ]);
        $this->secondRoom = Room::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id, 'location_id' => $this->location->id,
            'name' => 'Room 2', 'room_type' => 'single', 'capacity' => 1, 'sort' => 2,
        ]);
        $this->suite = Room::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id, 'location_id' => $this->location->id,
            'name' => 'Suite', 'room_type' => 'couples', 'capacity' => 2, 'sort' => 3,
        ]);

        $this->made = $this->staff('Made', 'male', 'senior');
        $this->wayan = $this->staff('Wayan', 'male', 'senior');
        $this->luh = $this->staff('Luh', 'female', 'senior');

        $this->massage = Service::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id,
            'category_id' => $this->category('Massage')->id,
            'name' => 'Massage', 'slug' => 'massage', 'buffer_min' => 15,
            'room_type' => 'single', 'therapists_needed' => 1, 'max_guests' => 1,
            'price_basis' => 'per_guest',
        ]);
        $this->massage60 = ServiceVariant::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id,
            'service_id' => $this->massage->id, 'duration_min' => 60, 'price' => 100000,
        ]);

        $this->couples = Service::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id,
            'category_id' => $this->category('Couples')->id,
            'name' => 'Couples', 'slug' => 'couples', 'buffer_min' => 15,
            'room_type' => 'couples', 'therapists_needed' => 2, 'max_guests' => 2,
            'price_basis' => 'per_booking',
        ]);
        $this->couples120 = ServiceVariant::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id,
            'service_id' => $this->couples->id, 'duration_min' => 120, 'price' => 1000000,
        ]);

        foreach ([$this->massage, $this->couples] as $service) {
            foreach ([$this->made, $this->wayan, $this->luh] as $staff) {
                DB::table('staff_skills')->insert([
                    'staff_id' => $staff->id, 'service_id' => $service->id, 'tenant_id' => $this->tenant->id,
                ]);
            }
        }

        $this->day = \Carbon\CarbonImmutable::today($this->location->timezone)->next('Mon')->toDateString();
        $this->shiftEveryone($this->day);
    }

    protected function staff(string $name, string $gender, string $level): Staff
    {
        return Staff::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id,
            'display_name' => $name, 'gender' => $gender, 'level' => $level, 'sort' => 10,
        ]);
    }

    protected function category(string $name)
    {
        return \App\Models\ServiceCategory::create([
            'id' => $this->uid(), 'tenant_id' => $this->tenant->id, 'name' => $name, 'sort' => 1,
        ]);
    }

    protected function shiftEveryone(string $day): void
    {
        foreach ([$this->made, $this->wayan, $this->luh] as $staff) {
            Shift::create([
                'id' => $this->uid(), 'tenant_id' => $this->tenant->id,
                'staff_id' => $staff->id, 'location_id' => $this->location->id,
                'starts_at' => \Carbon\CarbonImmutable::parse($day.' 09:00', 'Asia/Makassar'),
                'ends_at' => \Carbon\CarbonImmutable::parse($day.' 21:00', 'Asia/Makassar'),
            ]);
        }
    }

    /**
     * Seed an active booking with one item and its staff + room resources,
     * exactly like BookingService::createHold does.
     */
    protected function book(ServiceVariant $variant, string $day, string $start, array $staff, Room $room): Booking
    {
        $service = $variant->service;
        $startsAt = \Carbon\CarbonImmutable::parse("$day $start", $this->location->timezone);
        // resources carry duration + service buffer, same as createHold
        $endsAt = $startsAt->addMinutes($variant->duration_min + $service->buffer_min);

        $booking = Booking::create([
            'id' => $this->uid(),
            'tenant_id' => $this->tenant->id,
            'location_id' => $this->location->id,
            'code' => 'TST-'.random_int(1000, 9999),
            'status' => 'confirmed',
            'source' => 'online',
            'policy_snapshot' => ['deposit_percent' => 30, 'cancel_window_hours' => 24, 'no_show_fee_percent' => 50],
            'total' => $variant->price,
        ]);

        $item = BookingItem::create([
            'id' => $this->uid(),
            'tenant_id' => $this->tenant->id,
            'booking_id' => $booking->id,
            'service_variant_id' => $variant->id,
            'service_id' => $service->id,
            'guests' => max(1, $service->max_guests),
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
            'duration_min' => $variant->duration_min,
            'price' => $variant->price,
        ]);

        foreach ($staff as $s) {
            BookingResource::create([
                'id' => $this->uid(),
                'tenant_id' => $this->tenant->id,
                'booking_item_id' => $item->id,
                'staff_id' => $s->id,
                'starts_at' => $startsAt,
                'ends_at' => $endsAt,
            ]);
        }
        BookingResource::create([
            'id' => $this->uid(),
            'tenant_id' => $this->tenant->id,
            'booking_item_id' => $item->id,
            'room_id' => $room->id,
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
        ]);

        return $booking;
    }
}
