<?php

namespace App\Http\Middleware;

use App\Support\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/** Admin routes require a signed-in user with a membership in this tenant. */
class EnsureTenantMember
{
    public function __construct(protected TenantContext $context)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()) {
            return redirect()->route('login', ['redirect' => $request->path()]);
        }

        $tenant = $this->context->get();
        abort_unless($tenant !== null, 404);

        $membership = $request->user()->membershipFor($tenant);
        abort_unless($membership !== null, 404);

        // per PRD: cross-tenant ids answer 404 (not 403)
        view()->share('membershipRole', $membership->role);

        return $next($request);
    }
}
