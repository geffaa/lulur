<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Form extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    public function versions() { return $this->hasMany(FormVersion::class); }
    public function activeVersion() { return $this->belongsTo(FormVersion::class, 'active_version_id'); }
    public function services() { return $this->hasMany(Service::class, 'requires_form_id'); }

    public function latestVersion(): ?FormVersion
    {
        return $this->versions()->orderByDesc('version')->first();
    }
}
