<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class BookingItemAddon extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = ['duration_min' => 'integer', 'price' => 'integer'];
}
