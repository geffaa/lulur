<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('forms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('kind', 12)->default('consent'); // intake / consent
            $table->text('description')->nullable();
            $table->foreignUuid('active_version_id')->nullable();
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('category_id')->constrained('service_categories')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('photo')->nullable();
            $table->unsignedSmallInteger('buffer_min')->default(15);
            $table->string('room_type', 12)->default('single'); // single / couples / facial / wet / any
            $table->unsignedSmallInteger('therapists_needed')->default(1);
            $table->unsignedSmallInteger('max_guests')->default(1);
            $table->string('price_basis', 12)->default('per_guest'); // per_guest / per_booking
            $table->foreignUuid('requires_form_id')->nullable()->constrained('forms')->nullOnDelete();
            $table->jsonb('deposit_rule')->nullable(); // per-service override of tenant policy
            $table->string('badge', 16)->nullable(); // e.g. "signature" (gold)
            $table->boolean('active')->default(true);
            $table->boolean('bookable_online')->default(true);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
            $table->unique(['tenant_id', 'slug']);
            $table->index('tenant_id');
        });

        Schema::create('service_variants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('service_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('duration_min');
            $table->bigInteger('price'); // minor units (IDR rupiah / USD cents)
            $table->jsonb('price_by_level')->nullable(); // {master: 250000, senior: 120000} surcharge in minor units
            $table->boolean('active')->default(true);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
            $table->index(['tenant_id', 'service_id']);
        });

        Schema::create('addons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedSmallInteger('duration_min')->default(0);
            $table->bigInteger('price');
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->index('tenant_id');
        });

        Schema::create('addon_service', function (Blueprint $table) {
            $table->foreignUuid('addon_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('service_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('tenant_id');
            $table->primary(['addon_id', 'service_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('addon_service');
        Schema::dropIfExists('addons');
        Schema::dropIfExists('service_variants');
        Schema::dropIfExists('services');
        Schema::dropIfExists('forms');
        Schema::dropIfExists('service_categories');
    }
};
