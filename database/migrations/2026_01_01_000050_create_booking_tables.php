<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('location_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('client_id')->nullable()->constrained()->nullOnDelete();
            $table->string('code', 16);
            $table->string('status', 16)->default('held'); // held/confirmed/checked_in/in_service/completed/no_show/cancelled/expired
            $table->string('source', 12)->default('online'); // online / walk_in / phone
            $table->timestampTz('hold_expires_at')->nullable();
            $table->timestampTz('confirmed_at')->nullable();
            $table->timestampTz('checked_in_at')->nullable();
            $table->timestampTz('completed_at')->nullable();
            $table->timestampTz('cancelled_at')->nullable();
            $table->jsonb('policy_snapshot'); // deposit %, cancel window, no-show fee — copied at creation
            $table->bigInteger('total')->default(0);
            $table->bigInteger('deposit_due')->default(0);
            $table->bigInteger('deposit_paid')->default(0);
            $table->bigInteger('tip_total')->default(0);
            $table->text('internal_note')->nullable();
            $table->timestampsTz();
            $table->unique(['tenant_id', 'code']);
            $table->index(['tenant_id', 'location_id', 'status']);
            $table->index(['tenant_id', 'client_id']);
        });

        Schema::create('booking_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('booking_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('service_variant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('service_id')->constrained()->cascadeOnDelete();
            $table->string('guest_name')->nullable();
            $table->unsignedSmallInteger('guests')->default(1);
            $table->timestampTz('starts_at');
            $table->timestampTz('ends_at');
            $table->unsignedSmallInteger('duration_min');
            $table->bigInteger('price'); // line total snapshot
            $table->text('guest_note')->nullable();
            $table->timestampsTz();
            $table->index(['tenant_id', 'booking_id']);
            $table->index(['tenant_id', 'starts_at']);
        });

        Schema::create('booking_item_addons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('booking_item_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('addon_id')->constrained()->nullOnDelete();
            $table->string('name'); // snapshot
            $table->unsignedSmallInteger('duration_min');
            $table->bigInteger('price');
            $table->timestampsTz();
            $table->index('tenant_id');
        });

        /*
         * One row per assigned therapist and one row per occupied room.
         * staff_id and room_id are exclusive: a couples booking produces two
         * staff rows sharing the same room row's window.
         */
        Schema::create('booking_resources', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('booking_item_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('staff_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignUuid('room_id')->nullable()->constrained()->nullOnDelete();
            $table->timestampTz('starts_at');
            $table->timestampTz('ends_at');
            $table->string('status', 10)->default('active'); // active / released
            $table->timestampsTz();
            $table->index(['tenant_id', 'staff_id']);
            $table->index(['tenant_id', 'room_id']);
        });

        // btree_gist lets the exclusion constraint mix equality (uuid) with
        // range overlap (tstzrange) — the hard guarantee behind "never
        // double-book a therapist or a room", even under concurrent holds.
        DB::statement('CREATE EXTENSION IF NOT EXISTS btree_gist');

        DB::statement(<<<'SQL'
            ALTER TABLE booking_resources
              ADD COLUMN period tstzrange
              GENERATED ALWAYS AS (tstzrange(starts_at, ends_at)) STORED
        SQL);

        DB::statement(<<<'SQL'
            ALTER TABLE booking_resources
              ADD CONSTRAINT booking_resources_staff_no_overlap
              EXCLUDE USING gist (
                tenant_id WITH =,
                staff_id  WITH =,
                period    WITH &&
              )
              WHERE (staff_id IS NOT NULL AND status = 'active')
        SQL);

        DB::statement(<<<'SQL'
            ALTER TABLE booking_resources
              ADD CONSTRAINT booking_resources_room_no_overlap
              EXCLUDE USING gist (
                tenant_id WITH =,
                room_id   WITH =,
                period    WITH &&
              )
              WHERE (room_id IS NOT NULL AND status = 'active')
        SQL);
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_resources');
        Schema::dropIfExists('booking_item_addons');
        Schema::dropIfExists('booking_items');
        Schema::dropIfExists('bookings');
    }
};
