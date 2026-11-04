<?php

namespace App\Models\Concerns;

use App\Support\TenantContext;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Global scope by the resolved tenant + auto tenant_id on create.
 * Applied to every tenant-owned model so a forgotten where() cannot leak.
 */
trait BelongsToTenant
{
    /** Convenience relation — class-level definitions override this. */
    public function tenant()
    {
        return $this->belongsTo(\App\Models\Tenant::class);
    }

    public static function bootBelongsToTenant(): void
    {
        static::addGlobalScope('tenant', function (Builder $builder) {
            $tenantId = app(TenantContext::class)->id();
            $builder->when($tenantId, fn ($q) => $q->where($builder->getModel()->getTable().'.tenant_id', $tenantId));
        });

        static::creating(function (Model $model) {
            if (! $model->tenant_id && app()->bound(TenantContext::class)) {
                $model->tenant_id = app(TenantContext::class)->id();
            }
        });
    }
}
