<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class BookingResource extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function item() { return $this->belongsTo(BookingItem::class, 'booking_item_id'); }
    public function staff() { return $this->belongsTo(Staff::class); }
    public function room() { return $this->belongsTo(Room::class); }

    public function booking()
    {
        return $this->hasOneThrough(
            Booking::class,
            BookingItem::class,
            'id', 'id', 'booking_item_id', 'booking_id'
        );
    }
}
