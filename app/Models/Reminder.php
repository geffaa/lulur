<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Reminder extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = ['send_at' => 'datetime', 'sent_at' => 'datetime'];

    public function booking() { return $this->belongsTo(Booking::class); }
}
