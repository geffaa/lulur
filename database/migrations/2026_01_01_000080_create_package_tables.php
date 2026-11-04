<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('service_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedSmallInteger('sessions_count');
            $table->bigInteger('price'); // whole package, minor units
            $table->unsignedSmallInteger('valid_months')->default(6);
            $table->unsignedTinyInteger('discount_percent')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->index('tenant_id');
        });

        Schema::create('client_packages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('client_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('package_id')->constrained()->cascadeOnDelete();
            $table->timestampTz('purchased_at');
            $table->timestampTz('expires_at');
            $table->unsignedSmallInteger('sessions_total');
            $table->unsignedSmallInteger('sessions_left');
            $table->timestampsTz();
            $table->index(['tenant_id', 'client_id']);
        });

        Schema::create('package_redemptions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('client_package_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('booking_item_id')->constrained()->cascadeOnDelete();
            $table->timestampTz('redeemed_at');
            $table->timestampsTz();
            $table->index('tenant_id');
        });

        Schema::create('gift_cards', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('code', 20);
            $table->bigInteger('initial_amount');
            $table->bigInteger('balance');
            $table->timestampTz('expires_at')->nullable();
            $table->timestampTz('purchased_at')->nullable();
            $table->foreignUuid('purchased_by')->nullable()->constrained('clients')->nullOnDelete();
            $table->string('message')->nullable();
            $table->timestampsTz();
            $table->unique(['tenant_id', 'code']);
        });

        Schema::create('gift_card_ledger', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('gift_card_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('payment_id')->nullable()->constrained()->nullOnDelete();
            $table->bigInteger('delta'); // negative = spent
            $table->bigInteger('balance_after');
            $table->string('note')->nullable();
            $table->timestampTz('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gift_card_ledger');
        Schema::dropIfExists('gift_cards');
        Schema::dropIfExists('package_redemptions');
        Schema::dropIfExists('client_packages');
        Schema::dropIfExists('packages');
    }
};
