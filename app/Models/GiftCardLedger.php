<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class GiftCardLedger extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = ['delta' => 'integer', 'balance_after' => 'integer', 'created_at' => 'datetime'];

    public $timestamps = false;

    public function giftCard() { return $this->belongsTo(GiftCard::class); }
}
