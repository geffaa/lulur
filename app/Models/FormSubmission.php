<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class FormSubmission extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    protected $casts = [
        'answers' => 'encrypted:array',
        'signature' => 'encrypted',
        'signed_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    public function version() { return $this->belongsTo(FormVersion::class, 'form_version_id'); }
    public function booking() { return $this->belongsTo(Booking::class); }
    public function client() { return $this->belongsTo(Client::class); }

    public function isValid(): bool
    {
        return $this->signed_at !== null
            && ($this->expires_at === null || $this->expires_at->isFuture());
    }
}
