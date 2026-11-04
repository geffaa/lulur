<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Tip extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = ['amount' => 'integer'];

    public function payment() { return $this->belongsTo(Payment::class); }
    public function staff() { return $this->belongsTo(Staff::class); }
    public function booking() { return $this->belongsTo(Booking::class); }
}
