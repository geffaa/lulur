<?php

namespace App\Support;

use App\Models\Tenant;
use Illuminate\Support\Facades\DB;

/**
 * Holds the tenant resolved for the current request / process and mirrors it
 * into the Postgres session so row-level security can use it as a second
 * isolation layer. Everything tenant-scoped goes through here.
 */
class TenantContext
{
    protected ?Tenant $tenant = null;

    public function set(?Tenant $tenant): void
    {
        $this->tenant = $tenant;

        if ($tenant === null) {
            return;
        }

        // session-level (not inside a transaction): survives the whole request
        DB::statement('SELECT set_config(\'app.tenant_id\', ?, false)', [$tenant->id]);
    }

    public function get(): ?Tenant
    {
        return $this->tenant;
    }

    public function id(): ?string
    {
        return $this->tenant?->id;
    }

    public function check(): Tenant
    {
        if ($this->tenant === null) {
            abort(500, 'Tenant not resolved.');
        }

        return $this->tenant;
    }
}
