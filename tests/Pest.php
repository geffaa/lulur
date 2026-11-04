<?php

use App\Services\DayAvailability;
use App\Models\ServiceVariant;

pest()->extend(Tests\TestCase::class)
    ->use(Illuminate\Foundation\Testing\RefreshDatabase::class)
    ->in('Feature', 'Unit');

/**
 * Availability slots for a variant on a day (optionally by gender / staff).
 * Calls the engine directly — the cache is not part of what we test.
 */
function slotsOn(string $serviceVariantId, string $day, ?string $gender = null, ?string $staffId = null): DayAvailability
{
    $variant = ServiceVariant::find($serviceVariantId);

    return app(App\Services\AvailabilityEngine::class)
        ->forServiceOnDate($variant->service, $variant, test()->location, $day, $staffId, $gender);
}

function uid(): string
{
    return test()->uid();
}

expect()->extend('toBeOneOf', function (array $values) {
    return $this->toBeIn($values);
});
