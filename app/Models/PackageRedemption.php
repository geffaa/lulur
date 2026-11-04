<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class PackageRedemption extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = ['redeemed_at' => 'datetime'];

    public function clientPackage() { return $this->belongsTo(ClientPackage::class, 'client_package_id'); }
    public function bookingItem() { return $this->belongsTo(BookingItem::class); }
}
