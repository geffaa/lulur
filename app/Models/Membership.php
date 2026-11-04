<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Membership extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    public function user() { return $this->belongsTo(User::class); }
    public function tenant() { return $this->belongsTo(Tenant::class); }
    public function staff() { return $this->belongsTo(Staff::class); }
}
