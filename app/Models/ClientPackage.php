<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class ClientPackage extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = ['purchased_at' => 'datetime', 'expires_at' => 'datetime'];

    public function client() { return $this->belongsTo(Client::class); }
    public function package() { return $this->belongsTo(Package::class); }
    public function redemptions() { return $this->hasMany(PackageRedemption::class); }
}
