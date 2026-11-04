<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function challenge(Request $request)
    {
        abort_unless($request->session()->has('twofa.user'), 404);

        return Inertia::render('Auth/TwoFactor');
    }

    public function verify(Request $request)
    {
        $data = $request->validate(['code' => 'required|digits:6']);
        $userId = $request->session()->pull('twofa.user');
        abort_unless($userId, 404);

        $user = \App\Models\User::findOrFail($userId);

        if (! \App\Support\Totp::verify($user->twofa_secret, $data['code'])) {
            $request->session()->put('twofa.user', $userId);

            return back()->withErrors(['code' => 'That code is not right. Try the next one.']);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended('/admin/calendar');
    }
}
