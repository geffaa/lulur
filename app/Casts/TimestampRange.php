<?php

namespace App\Casts;

use Carbon\CarbonImmutable;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

/**
 * Postgres tstzrange <-> object { start, end } (CarbonImmutable, UTC).
 * Accepts "[a,b)" strings or [start, end] pairs when writing.
 */
class TimestampRange implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes): ?object
    {
        if ($value === null) {
            return null;
        }
        [$from, $to] = explode(',', trim($value, '[]()'), 2);

        return (object) [
            'start' => CarbonImmutable::parse(trim($from, '" '), 'UTC'),
            'end' => CarbonImmutable::parse(trim($to, '" '), 'UTC'),
        ];
    }

    public function set($model, string $key, $value, array $attributes): ?string
    {
        if ($value === null || is_string($value)) {
            return $value;
        }
        $start = is_array($value) ? $value[0] : $value->start;
        $end = is_array($value) ? $value[1] : $value->end;

        return sprintf('[%s,%s)', CarbonImmutable::parse($start)->utc()->toIso8601String(), CarbonImmutable::parse($end)->utc()->toIso8601String());
    }
}
