<?php

namespace App\Database;

use Illuminate\Database\PostgresConnection;

class UtcAwarePostgresConnection extends PostgresConnection
{
    public function useDefaultQueryGrammar(): void
    {
        $this->queryGrammar = new UtcAwarePostgresGrammar($this);
    }
}
