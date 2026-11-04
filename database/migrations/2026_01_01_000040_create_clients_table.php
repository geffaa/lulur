<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('phone_e164', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('gender_pref', 10)->nullable();
            $table->string('pressure_pref', 10)->nullable();
            $table->text('avoid_areas')->nullable();
            $table->text('allergies')->nullable(); // encrypted at rest
            $table->text('notes')->nullable(); // internal notes, encrypted
            $table->boolean('marketing_consent')->default(false);
            $table->string('stripe_customer_id')->nullable();
            $table->jsonb('saved_card')->nullable(); // {brand, last4, exp} — consent captured at checkout
            $table->unsignedTinyInteger('avatar_hue')->default(1);
            $table->timestamps();
            $table->index(['tenant_id']);
            $table->unique(['tenant_id', 'phone_e164']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
