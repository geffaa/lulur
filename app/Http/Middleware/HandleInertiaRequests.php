<?php

namespace App\Http\Middleware;

use App\Support\TenantContext;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $tenant = app(TenantContext::class)->get();
        $user = $request->user();

        return [
            ...parent::share($request),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'initials' => \App\Support\Str::initials($user->name),
                ] : null,
                'role' => $user && $tenant ? $user->membershipFor($tenant)?->role : null,
            ],
            'tenant' => $tenant ? [
                'id' => $tenant->id,
                'slug' => $tenant->slug,
                'name' => $tenant->name,
                'currency' => $tenant->currency,
                'timezone' => $tenant->default_timezone,
                'branding' => $tenant->branding,
                'logo_letter' => $tenant->branding['logo_letter'] ?? mb_substr($tenant->name, 0, 1),
                'locations' => $tenant->locations->map(fn ($l) => [
                    'id' => $l->id, 'name' => $l->name, 'slug' => $l->slug,
                ])->values(),
            ] : null,
        ];
    }
}
