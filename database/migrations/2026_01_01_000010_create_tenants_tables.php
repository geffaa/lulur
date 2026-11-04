<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('name');
            $table->char('currency', 3)->default('IDR');
            $table->string('default_timezone');
            $table->string('plan')->default('starter'); // starter / growth
            $table->string('status')->default('active'); // active / trialing / suspended
            $table->string('code_prefix', 8); // booking code prefix, e.g. TRT
            $table->jsonb('branding')->nullable(); // {logo_letter, accent, hero, intro}
            $table->jsonb('settings')->nullable(); // booking policy + quiet hours
            $table->timestamps();
        });

        Schema::create('memberships', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role'); // owner / manager / front_desk / therapist
            $table->foreignUuid('staff_id')->nullable();
            $table->timestamps();
            $table->unique(['tenant_id', 'user_id']);
        });

        Schema::create('locations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->string('timezone');
            $table->string('address')->nullable();
            $table->string('phone', 32)->nullable();
            $table->jsonb('opening_hours')->nullable(); // {mon: [["09:00","21:00"]], ...}
            $table->jsonb('holidays')->nullable(); // ["2026-12-25", ...]
            $table->boolean('active')->default(true);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
            $table->unique(['tenant_id', 'slug']);
            $table->index('tenant_id');
        });

        Schema::create('rooms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('location_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('room_type'); // single / couples / facial / wet
            $table->unsignedSmallInteger('capacity')->default(1);
            $table->boolean('active')->default(true);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
            $table->index(['tenant_id', 'location_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
        Schema::dropIfExists('locations');
        Schema::dropIfExists('memberships');
        Schema::dropIfExists('tenants');
    }
};
