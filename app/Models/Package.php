<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Package extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = [
        'sessions_count' => 'integer',
        'price' => 'integer',
        'valid_months' => 'integer',
        'discount_percent' => 'integer',
        'active' => 'boolean',
    ];

    public function service() { return $this->belongsTo(Service::class); }
}
