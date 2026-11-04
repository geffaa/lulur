<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/*
 * Second isolation layer: PostgreSQL row-level security. The application
 * already scopes every query by tenant_id; these policies make a forgotten
 * where-clause return zero rows instead of another tenant's data.
 *
 * The connection sets `SET app.tenant_id = <uuid>` after tenant resolution
 * (App\Support\TenantContext). Policies use current_setting(..., true) so an
 * unset context denies every row — default deny.
 */
return new class extends Migration
{
    protected array $tables = [
        'locations', 'rooms', 'staff', 'shifts', 'time_off',
        'service_categories', 'services', 'service_variants', 'addons', 'addon_service', 'staff_skills',
        'clients',
        'bookings', 'booking_items', 'booking_item_addons', 'booking_resources',
        'forms', 'form_versions', 'form_submissions',
        'packages', 'client_packages', 'package_redemptions',
        'gift_cards', 'gift_card_ledger',
        'payments', 'tips', 'reminders', 'waitlist_entries', 'memberships',
    ];

    public function up(): void
    {
        foreach ($this->tables as $table) {
            DB::statement(sprintf('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', $table));
            DB::statement(sprintf('ALTER TABLE %s FORCE ROW LEVEL SECURITY', $table));
            DB::statement(sprintf(
                'CREATE POLICY tenant_isolation ON %s USING (tenant_id = current_setting(\'app.tenant_id\', true)::uuid)',
                $table
            ));
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $table) {
            DB::statement(sprintf('DROP POLICY IF EXISTS tenant_isolation ON %s', $table));
            DB::statement(sprintf('ALTER TABLE %s NO FORCE ROW LEVEL SECURITY', $table));
            DB::statement(sprintf('ALTER TABLE %s DISABLE ROW LEVEL SECURITY', $table));
        }
    }
};
