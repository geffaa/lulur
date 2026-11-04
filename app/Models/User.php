<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'is_platform_admin',
        'twofa_secret', 'twofa_enabled', 'twofa_recovery',
    ];

    protected $hidden = ['password', 'remember_token', 'twofa_secret'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_platform_admin' => 'boolean',
            'twofa_enabled' => 'boolean',
            'twofa_secret' => 'encrypted',
        ];
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    public function membershipFor(Tenant $tenant): ?Membership
    {
        return $this->memberships->firstWhere('tenant_id', $tenant->id);
    }

    public function staffRecordFor(Tenant $tenant): ?Staff
    {
        $membership = $this->membershipFor($tenant);

        return $membership?->staff_id ? Staff::find($membership->staff_id) : null;
    }
}
