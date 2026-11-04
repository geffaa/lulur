<?php

namespace App\Database;

use Illuminate\Database\Query\Grammars\PostgresGrammar as BasePostgresGrammar;

/**
 * Includes the timezone offset in bound date strings (…+08:00) so PostgreSQL
 * stores the true instant even when the value carries a non-UTC timezone
 * (Lulur stores UTC but builds Carbon values in the location's timezone).
 */
class UtcAwarePostgresGrammar extends BasePostgresGrammar
{
    public function getDateFormat(): string
    {
        return 'Y-m-d H:i:sP';
    }
}
