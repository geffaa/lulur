<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Concerns\BelongsToTenant;

class Staff extends Model
{
    use HasUuids, BelongsToTenant;

    protected $table = 'staff';
    protected $guarded = [];
    protected $casts = ['active' => 'boolean'];

    public function tenant() { return $this->belongsTo(Tenant::class); }
    public function user() { return $this->belongsTo(User::class); }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'staff_skills', 'staff_id', 'service_id');
    }

    public function shifts() { return $this->hasMany(Shift::class); }
    public function timeOff() { return $this->hasMany(TimeOff::class); }

    public function initials(): string
    {
        $parts = preg_split('/\s+/', trim($this->display_name));
        if (count($parts) === 1) {
            return strtoupper(substr($parts[0], 0, 2));
        }
        return strtoupper(substr($parts[0], 0, 1).substr(end($parts), 0, 1));
    }

    public function shiftFor(\Carbon\CarbonInterface $day, string $locationId): ?Shift
    {
        $dayStart = $day->copy()->startOfDay();
        $dayEnd = $day->copy()->endOfDay();

        return $this->shifts()
            ->where('location_id', $locationId)
            ->where('starts_at', '<', $dayEnd)
            ->where('ends_at', '>', $dayStart)
            ->orderBy('starts_at')
            ->first();
    }
}
