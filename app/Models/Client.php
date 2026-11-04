<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Client extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    protected $casts = [
        'allergies' => 'encrypted',
        'notes' => 'encrypted',
        'saved_card' => 'array',
        'marketing_consent' => 'boolean',
    ];

    public function bookings() { return $this->hasMany(Booking::class); }
    public function payments() { return $this->hasMany(Payment::class); }
    public function packages() { return $this->hasMany(ClientPackage::class); }
    public function formSubmissions() { return $this->hasMany(FormSubmission::class); }

    public function initials(): string
    {
        $parts = preg_split('/\s+/', trim($this->name));
        if (count($parts) === 1) {
            return strtoupper(substr($parts[0], 0, 2));
        }
        return strtoupper(substr($parts[0], 0, 1).substr(end($parts), 0, 1));
    }
}
