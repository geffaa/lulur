<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Support\Money;
use App\Support\Str;
use App\Support\TenantContext;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientAdminController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    public function index(Request $request)
    {
        $tenant = $this->ctx->check();

        $clients = Client::query()
            ->withCount(['bookings as visits' => fn ($q) => $q->where('status', 'completed')])
            ->when($request->get('search'), fn ($q, $s) => $q->where(fn ($w) => $w
                ->where('name', 'like', "%$s%")
                ->orWhere('phone_e164', 'like', "%$s%")
                ->orWhere('email', 'like', "%$s%")))
            ->orderBy('name')
            ->limit(200)
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'initials' => $c->initials(),
                'hue' => $c->avatar_hue,
                'phone' => $c->phone_e164,
                'email' => $c->email,
                'visits' => $c->visits,
                'has_package' => $c->packages()->where('sessions_left', '>', 0)->exists(),
            ]);

        return inertia('Admin/Clients', [
            'clients' => $clients,
            'search' => $request->get('search'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:120',
            'phone_e164' => 'nullable|string|max:24',
            'email' => 'nullable|email',
        ]);

        $client = Client::create($data + ['avatar_hue' => Str::hue($data['name'])]);

        return redirect()->route('admin.clients.show', $client);
    }

    /** A02 — client profile. */
    public function show(Request $request, Client $client)
    {
        $tenant = $this->ctx->check();
        $tz = $tenant->default_timezone;

        $completed = $client->bookings()->where('status', 'completed');
        $stats = [
            'visits' => (clone $completed)->count(),
            'spent' => (int) $client->payments()->where('status', 'succeeded')->whereNotIn('kind', ['refund'])->sum('amount'),
            'no_shows' => $client->bookings()->where('status', 'no_show')->count(),
        ];

        // preferences with allergy warning (DESIGN.md: surface allergies)
        $prefs = [];
        if ($client->allergies) {
            $prefs[] = ['warn' => true, 'icon' => 'triangle-alert', 'html' => '<b>Allergy</b> · '.e($client->allergies)];
        }
        if ($client->avoid_areas) {
            $prefs[] = ['warn' => false, 'icon' => 'user-round', 'html' => 'Avoid '.e($client->avoid_areas)];
        }
        if ($client->pressure_pref) {
            $prefs[] = ['warn' => false, 'icon' => 'thermometer', 'html' => 'Prefers <b>'.e($client->pressure_pref).' pressure</b>'];
        }

        $forms = $client->formSubmissions()
            ->with('version.form:id,name')
            ->orderByDesc('signed_at')
            ->limit(10)
            ->get()
            ->map(fn ($fs) => [
                'id' => $fs->id,
                'form' => $fs->version->form->name.' v'.$fs->version->version,
                'signed_at' => $fs->signed_at?->timezone($tz)->format('j M Y'),
                'valid_until' => $fs->expires_at?->format('j M Y'),
                'valid' => $fs->isValid(),
                'guest' => $fs->guest_name,
            ]);

        $packages = $client->packages()->with('package:id,name,sessions_count,price,service_id,discount_percent')
            ->get()
            ->map(function ($cp) use ($tenant) {
                $used = $cp->sessions_total - $cp->sessions_left;

                return [
                    'id' => $cp->id,
                    'name' => $cp->package->name,
                    'total' => $cp->sessions_total,
                    'used' => $used,
                    'left' => $cp->sessions_left,
                    'expires' => $cp->expires_at->format('j M Y'),
                    'purchased' => $cp->purchased_at->format('j M Y'),
                    'per_session' => intdiv($cp->package->price, max(1, $cp->sessions_total)),
                    'currency' => $tenant->currency,
                    'valid' => $cp->expires_at->isFuture() && $cp->sessions_left > 0,
                ];
            });

        $history = $client->bookings()
            ->with(['items.service:id,name', 'items.resources.staff:id,display_name', 'items.resources.room:id,name', 'items.packageRedemption:id,booking_item_id', 'payments'])
            ->orderByDesc('created_at')
            ->limit(15)
            ->get()
            ->map(function ($b) use ($tz) {
                $item = $b->items->first();
                $staff = $item?->resources->whereNotNull('staff_id')->first()?->staff?->display_name;
                $room = $item?->resources->whereNotNull('room_id')->first()?->room?->name;
                $tip = $b->payments->where('kind', 'tip')->where('status', 'succeeded')->sum('amount');

                return [
                    'id' => $b->id,
                    'when' => $item?->starts_at?->timezone($tz)->format('D j M, H:i') ?? $b->created_at->timezone($tz)->format('j M Y'),
                    'service' => $item?->service?->name,
                    'staff' => $staff,
                    'room' => $room,
                    'status' => $b->status,
                    'status_label' => $b->statusEnum()->label(),
                    'package' => $item?->packageRedemption ? 'Package' : null,
                    'amount' => $item?->price ?? $b->total,
                    'tip' => $tip,
                ];
            });

        return inertia('Admin/ClientShow', [
            'client' => [
                'id' => $client->id,
                'name' => $client->name,
                'initials' => $client->initials(),
                'hue' => $client->avatar_hue,
                'phone' => $client->phone_e164,
                'email' => $client->email,
                'stats' => $stats,
                'prefs' => $prefs,
                'pressure' => $client->pressure_pref,
                'allergies' => $client->allergies,
                'avoid' => $client->avoid_areas,
                'notes' => $client->notes,
                'marketing_consent' => $client->marketing_consent,
            ],
            'forms' => $forms,
            'packages' => $packages,
            'history' => $history,
            'currency' => $tenant->currency,
        ]);
    }

    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:120',
            'phone_e164' => 'sometimes|nullable|string|max:24',
            'email' => 'sometimes|nullable|email',
            'pressure' => 'sometimes|nullable|in:light,medium,firm',
            'allergies' => 'sometimes|nullable|string|max:500',
            'avoid' => 'sometimes|nullable|string|max:500',
            'notes' => 'sometimes|nullable|string|max:2000',
            'marketing_consent' => 'sometimes|boolean',
        ]);

        $client->fill([
            'name' => $data['name'] ?? $client->name,
            'phone_e164' => $data['phone_e164'] ?? $client->phone_e164,
            'email' => $data['email'] ?? $client->email,
            'pressure_pref' => $data['pressure'] ?? $client->pressure_pref,
            'allergies' => array_key_exists('allergies', $data) ? $data['allergies'] : $client->allergies,
            'avoid_areas' => array_key_exists('avoid', $data) ? $data['avoid'] : $client->avoid_areas,
            'notes' => array_key_exists('notes', $data) ? $data['notes'] : $client->notes,
            'marketing_consent' => $data['marketing_consent'] ?? $client->marketing_consent,
        ])->save();

        return back()->with('success', 'Client updated.');
    }
}
