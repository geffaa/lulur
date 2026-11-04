<?php

namespace App\Models;

use App\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Concerns\BelongsToTenant;

class Booking extends Model
{
    use HasUuids, BelongsToTenant;

    protected $guarded = [];

    protected $casts = [
        'policy_snapshot' => 'array',
        'hold_expires_at' => 'datetime',
        'confirmed_at' => 'datetime',
        'checked_in_at' => 'datetime',
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'total' => 'integer',
        'deposit_due' => 'integer',
        'deposit_paid' => 'integer',
        'tip_total' => 'integer',
    ];

    public function tenant() { return $this->belongsTo(Tenant::class); }
    public function location() { return $this->belongsTo(Location::class); }
    public function client() { return $this->belongsTo(Client::class); }
    public function items() { return $this->hasMany(BookingItem::class); }
    public function payments() { return $this->hasMany(Payment::class); }
    public function reminders() { return $this->hasMany(Reminder::class); }
    public function formSubmissions() { return $this->hasMany(FormSubmission::class); }
    public function tips() { return $this->hasMany(Tip::class); }

    /** Signed, non-guessable token for the public manage link (?t=). */
    public function manageToken(): string
    {
        return hash_hmac('sha256', $this->id.'|'.$this->code, (string) config('app.key'));
    }

    public function hasValidManageToken(?string $token): bool
    {
        return $token !== null && hash_equals($this->manageToken(), $token);
    }

    public function formSubmissionsSigned(): bool
    {
        return $this->formSubmissions()->whereNotNull('signed_at')->whereDate('expires_at', '>', now())->exists();
    }

    /** "Form missing" flag for the calendar when a required form isn't signed. */
    public function formMissing(): bool
    {
        $needsForm = $this->items()->with('service')->get()
            ->contains(fn ($item) => $item->service->requires_form_id !== null);

        return $needsForm && ! $this->formSubmissionsSigned();
    }

    public function resources()
    {
        return BookingResource::query()
            ->whereIn('booking_item_id', $this->items()->select('id'));
    }

    public function statusEnum(): BookingStatus
    {
        return BookingStatus::from($this->status);
    }

    public function scopeActive($query)
    {
        return $query->whereIn('status', array_map(
            fn (BookingStatus $s) => $s->value,
            array_filter(BookingStatus::cases(), fn (BookingStatus $s) => $s->blocksResources())
        ));
    }

    public function scopeForDay($query, $startsAt, $endsAt)
    {
        return $query->whereHas('items', fn ($q) => $q
            ->where('starts_at', '<', $endsAt)
            ->where('ends_at', '>', $startsAt));
    }

    public function start()
    {
        return $this->items()->min('starts_at');
    }

    public function end()
    {
        return $this->items()->max('ends_at');
    }

    /** Room names across items (for calendar blocks). */
    public function roomNames(): string
    {
        $names = $this->resources()->with('room')->get()
            ->filter(fn ($r) => $r->room)
            ->map(fn ($r) => $r->room->name)
            ->unique();

        return $names->implode(' · ');
    }

    public function staffIds(): array
    {
        return $this->resources()->whereNotNull('staff_id')->pluck('staff_id')->unique()->all();
    }

    public function isCouples(): bool
    {
        return $this->items()->where('guests', '>', 1)->exists();
    }

    public function balanceDue(): int
    {
        $paid = $this->payments()->where('kind', 'balance')->where('status', 'succeeded')->sum('amount');
        return max(0, $this->total - $this->deposit_paid - $paid);
    }
}
