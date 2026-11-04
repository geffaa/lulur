<?php

namespace App\Enums;

enum BookingStatus: string
{
    case Held = 'held';
    case Confirmed = 'confirmed';
    case CheckedIn = 'checked_in';
    case InService = 'in_service';
    case Completed = 'completed';
    case NoShow = 'no_show';
    case Cancelled = 'cancelled';
    case Expired = 'expired';

    public function label(): string
    {
        return match ($this) {
            self::Held => 'Deposit pending',
            self::Confirmed => 'Confirmed',
            self::CheckedIn => 'Checked in',
            self::InService => 'In service',
            self::Completed => 'Completed',
            self::NoShow => 'No-show',
            self::Cancelled => 'Cancelled',
            self::Expired => 'Expired',
        };
    }

    public function icon(): string
    {
        return match ($this) {
            self::Held => 'hourglass',
            self::Confirmed => 'calendar-check',
            self::CheckedIn => 'door-open',
            self::InService => 'sparkles',
            self::Completed => 'check',
            self::NoShow => 'user-x',
            self::Cancelled, self::Expired => 'x',
        };
    }

    /** Booking occupies staff and room resources. */
    public function blocksResources(): bool
    {
        return in_array($this, [self::Held, self::Confirmed, self::CheckedIn, self::InService], true);
    }

    public function cssClass(): string
    {
        return match ($this) {
            self::Held => 'dep',
            self::Confirmed => 'conf',
            self::CheckedIn => 'in',
            self::InService => 'svc',
            self::Completed => 'done',
            self::NoShow => 'ns',
            self::Cancelled, self::Expired => 'done',
        };
    }
}
