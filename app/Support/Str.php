<?php

namespace App\Support;

class Str
{
    public static function initials(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name));
        if (count($parts) === 1) {
            return strtoupper(mb_substr($parts[0], 0, 2));
        }

        return strtoupper(mb_substr($parts[0], 0, 1).mb_substr(end($parts), 0, 1));
    }

    public static function hue(string $seed): int
    {
        return (abs(crc32($seed)) % 7) + 1;
    }
}
