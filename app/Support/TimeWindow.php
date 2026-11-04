<?php

namespace App\Support;

use Carbon\CarbonInterface;
use Illuminate\Support\Collection;

class TimeWindow
{
    /** [start, end] pairs overlap [start, end)? */
    public static function anyOverlaps(CarbonInterface $start, CarbonInterface $end, Collection|array $windows): bool
    {
        foreach ($windows as [$wStart, $wEnd]) {
            if ($start->lt($wEnd) && $end->gt($wStart)) {
                return true;
            }
        }

        return false;
    }
}
