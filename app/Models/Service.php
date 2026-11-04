<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Concerns\BelongsToTenant;

class Service extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = [
        'active' => 'boolean',
        'bookable_online' => 'boolean',
        'deposit_rule' => 'array',
        'therapists_needed' => 'integer',
        'max_guests' => 'integer',
        'buffer_min' => 'integer',
    ];

    public function category() { return $this->belongsTo(ServiceCategory::class, 'category_id'); }
    public function variants() { return $this->hasMany(ServiceVariant::class); }
    public function addons(): BelongsToMany
    {
        return $this->belongsToMany(Addon::class, 'addon_service', 'service_id', 'addon_id');
    }
    public function form() { return $this->belongsTo(Form::class, 'requires_form_id'); }

    /** Active therapists who can perform this service (pivot carries tenant_id for RLS). */
    public function skilledStaff(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class, 'staff_skills', 'service_id', 'staff_id')
            ->withPivot('tenant_id')
            ->where('staff.active', true);
    }

    public function scopeActive($query)
    {
        return $query->where('services.active', true);
    }

    public function isCouples(): bool
    {
        return $this->room_type === 'couples' || $this->max_guests > 1;
    }

    /** Booking policy merged with the per-service deposit override. */
    public function effectivePolicy(Tenant $tenant): array
    {
        return array_merge($tenant->bookingPolicy(), $this->deposit_rule ?? []);
    }
}
