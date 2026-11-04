<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Support\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    public function show(Request $request)
    {
        $tenant = $this->ctx->get();

        return Inertia::render('Auth/Login', [
            'brand' => ['name' => $tenant?->name, 'logo_letter' => $tenant?->branding['logo_letter'] ?? 'L', 'mark' => $tenant?->branding['mark'] ?? null],
            'redirect' => $request->get('redirect', 'admin/calendar'),
        ]);
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::validate($credentials)) {
            return back()->withErrors(['email' => 'These credentials do not match our records.']);
        }

        $user = \App\Models\User::where('email', $credentials['email'])->first();

        if ($user->twofa_enabled) {
            $request->session()->put('twofa.user', $user->id);

            return redirect()->route('login.twofa');
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended('/'.$request->input('redirect', 'admin/calendar'));
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
