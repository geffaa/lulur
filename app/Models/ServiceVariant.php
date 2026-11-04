<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class ServiceVariant extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = [
        'duration_min' => 'integer',
        'price' => 'integer',
        'active' => 'boolean',
        'price_by_level' => 'array',
    ];

    public function service() { return $this->belongsTo(Service::class); }

    public function priceForLevel(string $level): int
    {
        return $this->price + (int) ($this->price_by_level[$level] ?? 0);
    }
}
