<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tenant extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $guarded = [];

    protected $casts = [
        'branding' => 'array',
        'settings' => 'array',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /** Deposit %, cancel window, no-show fee — per-service rules may override. */
    public function bookingPolicy(): array
    {
        return array_merge([
            'deposit_percent' => 30,
            'cancel_window_hours' => 24,
            'no_show_fee_percent' => 50,
            'saved_card_mode' => 'optional', // optional / required
            'deposit_note' => null,
        ], $this->settings['booking_policy'] ?? []);
    }

    public function policySnapshot(): array
    {
        return [
            'deposit_percent' => $this->bookingPolicy()['deposit_percent'],
            'cancel_window_hours' => $this->bookingPolicy()['cancel_window_hours'],
            'no_show_fee_percent' => $this->bookingPolicy()['no_show_fee_percent'],
            'saved_card_mode' => $this->bookingPolicy()['saved_card_mode'],
            'currency' => $this->currency,
            'captured_at' => now()->toIso8601String(),
        ];
    }

    public function locations(): HasMany
    {
        return $this->hasMany(Location::class);
    }

    public function staff(): HasMany
    {
        return $this->hasMany(Staff::class);
    }

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }
}
