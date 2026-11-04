<?php

namespace App\Support;

use NumberFormatter;

/**
 * All money is stored as integers in minor units (IDR: rupiah, USD: cents).
 */
class Money
{
    public static function minorUnits(int $amount, string $currency): int
    {
        return $currency === 'IDR' ? $amount : (int) round($amount * 100);
    }

    public static function format(int $minor, string $currency, bool $withCents = false): string
    {
        if ($currency === 'IDR') {
            return 'Rp '.number_format($minor, 0, ',', '.');
        }

        $value = $minor / 100;

        return (new NumberFormatter('en_US', NumberFormatter::CURRENCY))
            ->formatCurrency($value, $currency);
    }

    /** "Rp 3.29 m" style short form used on client stats. */
    public static function formatShort(int $minor, string $currency): string
    {
        if ($currency === 'IDR') {
            return match (true) {
                $minor >= 1_000_000_000 => 'Rp '.round($minor / 1_000_000_000, 1).' B',
                $minor >= 1_000_000 => 'Rp '.round($minor / 1_000_000, 2).' m',
                $minor >= 1_000 => 'Rp '.round($minor / 1_000, 0).' k',
                default => self::format($minor, $currency),
            };
        }

        return match (true) {
            $minor >= 1_000_00 => '$'.round($minor / 1_000_00, 1).'k',
            default => self::format($minor, $currency),
        };
    }
}
