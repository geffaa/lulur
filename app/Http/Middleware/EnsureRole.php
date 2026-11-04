<?php

namespace App\Http\Middleware;

use App\Support\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/** Restrict a route to membership roles, e.g. role:owner,manager. */
class EnsureRole
{
    public function __construct(protected TenantContext $context)
    {
    }

    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $tenant = $this->context->get();
        $membership = $request->user()?->membershipFor($tenant);
        abort_unless($membership !== null && in_array($membership->role, $roles, true), 404);

        return $next($request);
    }
}
