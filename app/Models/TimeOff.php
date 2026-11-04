<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class TimeOff extends Model
{
    use HasUuids, BelongsToTenant;

    protected $table = 'time_off';
    protected $guarded = [];

    protected $casts = [
        'period' => \App\Casts\TimestampRange::class,
    ];

    public function staff() { return $this->belongsTo(Staff::class); }
}
