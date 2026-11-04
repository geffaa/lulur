<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class FormVersion extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];
    protected $casts = [
        'fields' => 'array',
        'published_at' => 'datetime',
        'version' => 'integer',
    ];

    public function form() { return $this->belongsTo(Form::class); }
    public function submissions() { return $this->hasMany(FormSubmission::class); }
}
