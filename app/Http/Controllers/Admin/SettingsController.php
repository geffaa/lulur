<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Reminder;
use App\Support\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingsController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    /** Settings: business, policy, booking page, payments, staff & roles, audit. */
    public function index(Request $request)
    {
        $tenant = $this->ctx->check();
        $user = $request->user();

        $users = DB::table('memberships as m')
            ->join('users as u', 'u.id', '=', 'm.user_id')
            ->leftJoin('staff as s', 's.id', '=', 'm.staff_id')
            ->where('m.tenant_id', $tenant->id)
            ->get(['u.name', 'u.email', 'u.twofa_enabled', 'm.role', 's.display_name'])
            ->map(fn ($r) => [
                'name' => $r->name,
                'email' => $r->email,
                'role' => $r->role,
                'staff' => $r->display_name,
                'twofa' => (bool) $r->twofa_enabled,
            ]);

        $audit = DB::table('activity_log')
            ->where('subject_type', 'App\Models\Booking')
            ->whereIn('subject_id', $tenant->bookings()->select('id'))
            ->orderByDesc('created_at')
            ->limit(25)
            ->get()
            ->map(fn ($a) => [
                'who' => $a->causer_type ? json_decode($a->properties, true)['actor'] ?? 'system' : 'system',
                'what' => $a->description,
                'when' => \Carbon\Carbon::parse($a->created_at)->timezone($tenant->default_timezone)->format('j M, H:i'),
            ]);

        return inertia('Admin/Settings', [
            'business' => [
                'name' => $tenant->name,
                'currency' => $tenant->currency,
                'timezone' => $tenant->default_timezone,
                'plan' => $tenant->plan,
                'branding' => $tenant->branding,
            ],
            'policy' => $tenant->bookingPolicy(),
            'locations' => $tenant->locations()->get()->map(fn (Location $l) => [
                'id' => $l->id,
                'name' => $l->name,
                'timezone' => $l->timezone,
                'address' => $l->address,
                'phone' => $l->phone,
                'opening_hours' => $l->opening_hours,
            ]),
            'users' => $users,
            'audit' => $audit,
            'payments' => [
                'gateway_usd' => config('lulur.gateways.USD'),
                'gateway_idr' => config('lulur.gateways.IDR'),
                'sandbox' => config('lulur.sandbox'),
            ],
        ]);
    }

    public function updateBusiness(Request $request)
    {
        $tenant = $this->ctx->check();
        $data = $request->validate([
            'name' => 'required|string|max:120',
            'branding.tagline' => 'nullable|string|max:200',
            'branding.hero' => 'nullable|string|max:200',
        ]);

        $tenant->update([
            'name' => $data['name'],
            'branding' => array_merge($tenant->branding ?? [], $data['branding'] ?? []),
        ]);

        return back()->with('success', 'Business profile saved.');
    }

    public function updatePolicy(Request $request)
    {
        $tenant = $this->ctx->check();
        $data = $request->validate([
            'deposit_percent' => 'required|integer|min:0|max:100',
            'cancel_window_hours' => 'required|integer|min:0|max:168',
            'no_show_fee_percent' => 'required|integer|min:0|max:100',
            'saved_card_mode' => 'required|in:optional,required',
        ]);

        $settings = $tenant->settings ?? [];
        $settings['booking_policy'] = $data;
        $tenant->update(['settings' => $settings]);

        activity()->performedOn($tenant)->withProperties(['actor' => $request->user()->name] + $data)->log('policy.updated');

        return back()->with('success', 'Booking policy saved — future bookings snapshot the new values.');
    }

    public function updateLocation(Request $request, Location $location)
    {
        $data = $request->validate([
            'name' => 'required|string|max:120',
            'timezone' => 'required|timezone',
            'address' => 'nullable|string|max:200',
            'phone' => 'nullable|string|max:30',
            'opening_hours' => 'required|array',
        ]);

        $location->update($data);

        return back()->with('success', 'Location saved.');
    }

    /** Marketing module: reminder templates + recent sends. */
    public function marketing(Request $request)
    {
        $tenant = $this->ctx->check();

        $reminders = Reminder::query()
            ->with('booking:id,code')
            ->orderByDesc('send_at')
            ->limit(30)
            ->get()
            ->map(fn ($r) => [
                'kind' => $r->kind,
                'channel' => $r->channel,
                'send_at' => $r->send_at->timezone($tenant->default_timezone)->format('D j M, H:i'),
                'status' => $r->status,
                'booking' => $r->booking?->code,
                'body' => $r->body,
            ]);

        return inertia('Admin/Marketing', [
            'templates' => $tenant->settings['templates'] ?? $this->defaultTemplates(),
            'reminders' => $reminders,
        ]);
    }

    protected function defaultTemplates(): array
    {
        return [
            ['kind' => 'confirmation', 'label' => 'Confirmation', 'channel' => 'WhatsApp + email', 'body' => '{{tenant}}: your {{service}} on {{when}} is confirmed. Manage: {{link}}'],
            ['kind' => 'h1', 'label' => 'Day before', 'channel' => 'WhatsApp', 'body' => 'See you tomorrow at {{time}} for your {{service}}. Reply to reschedule.'],
            ['kind' => 'h2', 'label' => '2 hours before', 'channel' => 'WhatsApp', 'body' => 'Your {{service}} starts at {{time}}. Please arrive 10 minutes early.'],
            ['kind' => 'form', 'label' => 'Form reminder', 'channel' => 'WhatsApp', 'body' => 'Please sign your treatment consent before your visit: {{link}}'],
            ['kind' => 'review', 'label' => 'Review request', 'channel' => 'WhatsApp', 'body' => 'Thank you for visiting {{tenant}}! We\'d love a review: {{review_url}}'],
        ];
    }
}
