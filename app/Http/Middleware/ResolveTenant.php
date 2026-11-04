<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use App\Support\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

/**
 * Resolves the tenant from the {tenant} subdomain of lulur.app (or the
 * platform host for admin.lulur.app). Unknown hosts fall back to the default
 * tenant locally so the demo can be opened on localhost:8000 too.
 */
class ResolveTenant
{
    public function __construct(protected TenantContext $context)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        // provider webhooks hit one global URL and identify the payment themselves
        if ($request->is('webhooks/*')) {
            return $next($request);
        }

        $host = $request->getHost();
        $appDomain = config('lulur.app_domain');
        $platformHost = config('lulur.platform_host');

        if ($host === $platformHost || str_starts_with($platformHost, $host)) {
            // platform admin: no tenant context
            return $next($request);
        }

        $subdomain = null;
        if (str_ends_with($host, '.'.$appDomain)) {
            $subdomain = substr($host, 0, -(strlen($appDomain) + 1));
        } elseif (! str_contains($host, config('lulur.app_domain'))) {
            // localhost / IP / *.test: take the first label if it is a tenant,
            // otherwise fall back to the default demo tenant
            $labels = explode('.', $host);
            $first = $labels[0];
            if (in_array($first, ['localhost', '127', 'www'], true) || is_numeric($first)) {
                $subdomain = config('lulur.default_tenant');
            } else {
                $subdomain = $first;
            }
        }

        if ($subdomain === null || $subdomain === '') {
            $subdomain = config('lulur.default_tenant');
        }

        $key = "tenant.slug.$subdomain";
        $tenant = Cache::get($key);
        if (! $tenant instanceof Tenant) {
            Cache::forget($key); // stale class or corrupted entry (shared Redis)
            $tenant = Tenant::query()->withoutGlobalScopes()->where('slug', $subdomain)->first();
            Cache::put($key, $tenant, 300);
        }

        abort_if($tenant === null && $request->isMethod('get') === false, 404);

        $this->context->set($tenant);

        return $next($request);
    }
}
