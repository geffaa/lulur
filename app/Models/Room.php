<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Room extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = ['active' => 'boolean', 'capacity' => 'integer'];

    public function location() { return $this->belongsTo(Location::class); }
    public function tenant() { return $this->belongsTo(Tenant::class); }
}
