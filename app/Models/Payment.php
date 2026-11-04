<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Payment extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = [
        'amount' => 'integer',
        'meta' => 'array',
        'paid_at' => 'datetime',
        'refunded_at' => 'datetime',
    ];

    public function booking() { return $this->belongsTo(Booking::class); }
    public function client() { return $this->belongsTo(Client::class); }
    public function tips() { return $this->hasMany(Tip::class); }
}
