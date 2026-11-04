<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class WaitlistEntry extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    protected $casts = ['window' => 'immutable_datetime_range:tstzrange'];

    public function client() { return $this->belongsTo(Client::class); }
    public function service() { return $this->belongsTo(Service::class); }
}
