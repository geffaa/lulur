<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Concerns\BelongsToTenant;

class Addon extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = ['duration_min' => 'integer', 'price' => 'integer', 'active' => 'boolean'];

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'addon_service', 'addon_id', 'service_id');
    }
}
