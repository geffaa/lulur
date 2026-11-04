<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class GiftCard extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = [
        'initial_amount' => 'integer',
        'balance' => 'integer',
        'expires_at' => 'datetime',
        'purchased_at' => 'datetime',
    ];

    public function ledger() { return $this->hasMany(GiftCardLedger::class); }
}
