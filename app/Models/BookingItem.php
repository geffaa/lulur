<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class BookingItem extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'duration_min' => 'integer',
        'guests' => 'integer',
        'price' => 'integer',
    ];

    public function booking() { return $this->belongsTo(Booking::class); }
    public function service() { return $this->belongsTo(Service::class); }
    public function variant() { return $this->belongsTo(ServiceVariant::class, 'service_variant_id'); }
    public function addons() { return $this->hasMany(BookingItemAddon::class); }
    public function resources() { return $this->hasMany(BookingResource::class); }

    public function packageRedemption() { return $this->hasOne(PackageRedemption::class); }
}
