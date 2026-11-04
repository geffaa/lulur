<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

/** P01 — platform admin (phase 2 surface, shown to explain multi-tenant design). */
class PlatformController extends Controller
{
    public function index(Request $request)
    {
        abort_unless($request->user()?->is_platform_admin, 404);

        $tenants = DB::table('tenants')
            ->orderBy('name')
            ->get()
            ->map(function ($t) {
                $bookings = DB::table('bookings')->where('tenant_id', $t->id)
                    ->where('created_at', '>', now()->subDays(30))->count();
                $locations = DB::table('locations')->where('tenant_id', $t->id)->count();

                return [
                    'name' => $t->name,
                    'slug' => $t->slug,
                    'region' => $t->branding['region'] ?? '',
                    'currency' => $t->currency,
                    'timezone' => $t->default_timezone,
                    'locations' => $locations,
                    'plan' => ucfirst($t->plan),
                    'bookings_30d' => $bookings,
                    'status' => $t->status,
                ];
            });

        return Inertia::render('Platform/Tenants', [
            'tenants' => $tenants,
            'kpi' => [
                'mrr' => $tenants->sum(fn ($t) => $t['plan'] === 'Growth' ? 129 : 29),
                'bookings_30d' => $tenants->sum('bookings_30d'),
            ],
        ]);
    }
}
