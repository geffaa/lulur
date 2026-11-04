<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Location extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    protected $casts = [
        'opening_hours' => 'array',
        'holidays' => 'array',
        'active' => 'boolean',
    ];

    public function tenant() { return $this->belongsTo(Tenant::class); }
    public function rooms() { return $this->hasMany(Room::class); }

    public function openingHoursFor(string $dayKey): array
    {
        return $this->opening_hours[$dayKey] ?? [];
    }

    public function staff() { return $this->hasManyThrough(Staff::class, Shift::class, 'location_id', 'id', 'id', 'staff_id')->distinct(); }
}
