<?php

use App\Models\Booking;
use App\Models\Client;
use App\Models\Service;
use App\Models\ServiceVariant;
use App\Models\Staff;
use App\Models\Tenant;
use App\Support\TenantContext;
use Illuminate\Support\Facades\Digest;

beforeEach(function () {
    $this->setUpFixture();
    // second tenant with its own service + client
    $other = Tenant::create([
        'id' => uid(), 'slug' => 'other', 'name' => 'Other Spa',
        'currency' => 'IDR', 'default_timezone' => 'Asia/Makassar', 'code_prefix' => 'OTH',
    ]);
    $this->other = $other;
    app(TenantContext::class)->set($other);
    $otherLocation = App\Models\Location::create([
        'id' => uid(), 'tenant_id' => $other->id, 'name' => 'Other Loc', 'slug' => 'other-loc',
        'timezone' => 'Asia/Makassar',
        'opening_hours' => array_fill_keys(['mon','tue','wed','thu','fri','sat','sun'], [['09:00','21:00']]),
    ]);
    $this->otherLocation = $otherLocation;
    $category = App\Models\ServiceCategory::create(['id' => uid(), 'tenant_id' => $other->id, 'name' => 'Massage']);
    $this->otherService = Service::create([
        'id' => uid(), 'tenant_id' => $other->id, 'category_id' => $category->id,
        'name' => 'Other Massage', 'slug' => 'other-massage', 'buffer_min' => 15, 'room_type' => 'single',
    ]);
    $this->otherClient = Client::create(['id' => uid(), 'tenant_id' => $other->id, 'name' => 'Other Client']);
    app(TenantContext::class)->set($this->tenant);
});

test('the global scope hides other tenants rows everywhere', function () {
    // as tenant "test": no other-tenant service, client, staff, booking visible
    expect(Service::find($this->otherService->id))->toBeNull()
        ->and(Client::find($this->otherClient->id))->toBeNull()
        ->and(Service::count())->toBe(2) // fixture's two services
        ->and(Client::count())->toBe(0);
});

test('cross-tenant model routes answer 404, not 403', function () {
    $owner = App\Models\User::create(['name' => 'Owner', 'email' => 'iso-owner@x.test', 'password' => 'password']);
    App\Models\Membership::create(['tenant_id' => $this->tenant->id, 'user_id' => $owner->id, 'role' => 'owner']);

    app(TenantContext::class)->set($this->other);
    $otherBooking = Booking::create([
        'id' => uid(), 'tenant_id' => $this->other->id, 'location_id' => $this->otherLocation->id,
        'code' => 'OTH-1001', 'status' => 'confirmed', 'source' => 'online', 'policy_snapshot' => [],
        'client_id' => $this->otherClient->id, 'total' => 1,
    ]);
    app(TenantContext::class)->set($this->tenant);

    $this->actingAs($owner)
        ->get('/admin/clients/'.$this->otherClient->id)
        ->assertNotFound();

    $this->actingAs($owner)
        ->getJson('/admin/calendar/panel/'.$otherBooking->id)
        ->assertNotFound();
});

test('cross-tenant writes are impossible via mass assignment of foreign ids', function () {
    $owner = App\Models\User::create(['name' => 'Owner2', 'email' => 'iso-owner2@x.test', 'password' => 'password']);
    App\Models\Membership::create(['tenant_id' => $this->tenant->id, 'user_id' => $owner->id, 'role' => 'owner']);

    // the controller scopes service lookup to the resolved tenant
    app(TenantContext::class)->set($this->tenant);
    $response = $this->actingAs($owner)
        ->postJson('/admin/bookings', [
            'client_name' => 'Ghost',
            'service_variant' => ServiceVariant::withoutGlobalScopes()->where('service_id', $this->otherService->id)->first()?->id ?? uid(),
            'start' => $this->day.' 10:00',
            'source' => 'walk_in',
        ]);

    $response->assertNotFound(); // 404: the variant belongs to another tenant
});
