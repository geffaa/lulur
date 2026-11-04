<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class ServiceCategory extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    public function services() { return $this->hasMany(Service::class); }
}
