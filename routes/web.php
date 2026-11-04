<?php

use App\Http\Controllers\Admin\CalendarController;
use App\Http\Controllers\Admin\BookingAdminController;
use App\Http\Controllers\Admin\CatalogController;
use App\Http\Controllers\Admin\ClientAdminController;
use App\Http\Controllers\Admin\ReportsController;
use App\Http\Controllers\Admin\RoomAdminController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\TeamAdminController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\TwoFactorController;
use App\Http\Controllers\Platform\PlatformController;
use App\Http\Controllers\Public\BookingController;
use App\Http\Controllers\Public\CheckoutController;
use App\Http\Controllers\Public\ManageController;
use App\Http\Controllers\Public\SandboxPayController;
use App\Http\Controllers\Therapist\TodayController;
use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public booking pages (per tenant subdomain)
|--------------------------------------------------------------------------
*/
Route::get('/', [BookingController::class, 'index'])->name('booking.index');
Route::get('/availability', [BookingController::class, 'availability'])->name('booking.availability');
Route::get('/availability/summary', [BookingController::class, 'availabilitySummary'])->name('booking.availability.summary');
Route::get('/time', [BookingController::class, 'time'])->name('booking.time');
Route::post('/holds', [BookingController::class, 'hold'])->name('booking.hold');

Route::get('/book/{code}/checkout', [CheckoutController::class, 'show'])->name('booking.checkout');
Route::post('/book/{code}/details', [CheckoutController::class, 'saveDetails'])->name('booking.details');
Route::post('/book/{code}/pay', [CheckoutController::class, 'pay'])->name('booking.pay');

// sandbox gateway (Lulur Pay) — mimics the provider page + webhook
Route::get('/pay/{payment}', [SandboxPayController::class, 'show'])->name('pay.show');
Route::post('/pay/{payment}/approve', [SandboxPayController::class, 'approve'])->name('pay.approve');
Route::get('/pay/return/{payment}', \App\Http\Controllers\Public\PayReturnController::class)->name('pay.return');
Route::post('/pay/{payment}/decline', [SandboxPayController::class, 'decline'])->name('pay.decline');

Route::get('/b/{code}', [ManageController::class, 'show'])->name('booking.manage');
Route::post('/b/{code}/reschedule', [ManageController::class, 'reschedule'])->name('booking.reschedule');
Route::post('/b/{code}/cancel', [ManageController::class, 'cancel'])->name('booking.cancel');
Route::get('/b/{code}/ics', [ManageController::class, 'ics'])->name('booking.ics');
Route::post('/b/{code}/sign', [ManageController::class, 'sign'])->name('booking.sign');

/*
|--------------------------------------------------------------------------
| Auth (tenant staff)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
    Route::get('/login/twofa', [TwoFactorController::class, 'challenge'])->name('login.twofa');
    Route::post('/login/twofa', [TwoFactorController::class, 'verify'])->name('login.twofa.verify');
});
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

/*
|--------------------------------------------------------------------------
| Therapist mobile view
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'tenant.member'])->group(function () {
    Route::get('/today', [TodayController::class, 'index'])->name('therapist.today');
});

/*
|--------------------------------------------------------------------------
| Tenant admin
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'tenant.member'])->prefix('admin')->group(function () {
    Route::get('/', fn () => redirect()->route('admin.calendar'))->name('admin.home');

    Route::get('/calendar', [CalendarController::class, 'index'])->name('admin.calendar');
    Route::get('/calendar/panel/{booking}', [CalendarController::class, 'panel'])->name('admin.calendar.panel');

    Route::post('/bookings', [BookingAdminController::class, 'store'])->name('admin.bookings.store');
    Route::post('/bookings/{booking}/move', [BookingAdminController::class, 'move'])->name('admin.bookings.move');
    Route::post('/bookings/{booking}/status', [BookingAdminController::class, 'status'])->name('admin.bookings.status');
    Route::post('/bookings/{booking}/checkout', [BookingAdminController::class, 'checkout'])->name('admin.bookings.checkout');
    Route::post('/bookings/{booking}/no-show-fee', [BookingAdminController::class, 'noShowFee'])->name('admin.bookings.noshowfee')->middleware('role:owner,manager');
    Route::get('/bookings', [BookingAdminController::class, 'index'])->name('admin.bookings');

    Route::get('/clients', [ClientAdminController::class, 'index'])->name('admin.clients');
    Route::post('/clients', [ClientAdminController::class, 'store'])->name('admin.clients.store');
    Route::get('/clients/{client}', [ClientAdminController::class, 'show'])->name('admin.clients.show');
    Route::put('/clients/{client}', [ClientAdminController::class, 'update'])->name('admin.clients.update');

    Route::get('/catalog', [CatalogController::class, 'index'])->name('admin.catalog');
    Route::get('/catalog/services/new', [CatalogController::class, 'create'])->name('admin.catalog.services.create');
    Route::get('/catalog/services/{service}', [CatalogController::class, 'edit'])->name('admin.catalog.services.edit');
    Route::post('/catalog/services', [CatalogController::class, 'storeService'])->name('admin.catalog.services.store');
    Route::put('/catalog/services/{service}', [CatalogController::class, 'updateService'])->name('admin.catalog.services.update');
    Route::post('/catalog/packages', [CatalogController::class, 'storePackage'])->name('admin.catalog.packages.store');
    Route::put('/catalog/forms/{form}', [CatalogController::class, 'updateForm'])->name('admin.catalog.forms.update');

    Route::get('/team', [TeamAdminController::class, 'index'])->name('admin.team');
    Route::post('/team/staff', [TeamAdminController::class, 'storeStaff'])->name('admin.team.staff.store');
    Route::put('/team/staff/{staff}', [TeamAdminController::class, 'updateStaff'])->name('admin.team.staff.update');
    Route::post('/team/shifts', [TeamAdminController::class, 'storeShift'])->name('admin.team.shifts.store');
    Route::delete('/team/shifts/{shift}', [TeamAdminController::class, 'destroyShift'])->name('admin.team.shifts.destroy');
    Route::post('/team/time-off', [TeamAdminController::class, 'storeTimeOff'])->name('admin.team.timeoff.store');

    Route::get('/rooms', [RoomAdminController::class, 'index'])->name('admin.rooms');
    Route::post('/rooms', [RoomAdminController::class, 'store'])->name('admin.rooms.store');
    Route::put('/rooms/{room}', [RoomAdminController::class, 'update'])->name('admin.rooms.update');

    Route::get('/marketing', [SettingsController::class, 'marketing'])->name('admin.marketing');
    Route::get('/reports', [ReportsController::class, 'index'])->name('admin.reports');
    Route::get('/settings', [SettingsController::class, 'index'])->name('admin.settings');
    Route::put('/settings/business', [SettingsController::class, 'updateBusiness'])->name('admin.settings.business');
    Route::put('/settings/policy', [SettingsController::class, 'updatePolicy'])->name('admin.settings.policy');
    Route::put('/settings/locations/{location}', [SettingsController::class, 'updateLocation'])->name('admin.settings.location');
});

// platform admin (P2) — admin.lulur.app
Route::middleware(['auth'])->prefix('platform')->group(function () {
    Route::get('/', [PlatformController::class, 'index'])->name('platform.index');
});

/*
|--------------------------------------------------------------------------
| Payment webhooks (idempotent)
|--------------------------------------------------------------------------
*/
Route::post('/webhooks/stripe', [WebhookController::class, 'stripe'])->name('webhooks.stripe');
Route::post('/webhooks/midtrans', [WebhookController::class, 'midtrans'])->name('webhooks.midtrans');
Route::post('/webhooks/whatsapp', [WebhookController::class, 'whatsapp'])->name('webhooks.whatsapp');

// Demo convenience (local only): sign in as a seeded user, no password form.
if (app()->environment('local')) {
    Route::get('/demo-login/{email}', function (string $email, \Illuminate\Http\Request $request) {
        $user = App\Models\User::where('email', $email)->firstOrFail();
        auth()->login($user);
        $next = $request->query('next');
        if ($next && str_starts_with($next, '/')) {
            return redirect($next);
        }
        $role = App\Models\Membership::withoutGlobalScopes()->where('user_id', $user->id)->value('role');
        if ($role === 'therapist') {
            return redirect('/today');
        }

        return redirect('/admin/calendar');
    })->name('demo.login');
}
