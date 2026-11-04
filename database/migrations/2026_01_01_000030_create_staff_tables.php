<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->nullable();
            $table->string('display_name');
            $table->string('gender', 10); // female / male
            $table->string('level', 12)->default('junior'); // junior / senior / master
            $table->string('specialty')->nullable(); // shown in the calendar head, e.g. "Facial"
            $table->string('photo')->nullable();
            $table->boolean('active')->default(true);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
            $table->index(['tenant_id']);
        });

        Schema::create('staff_skills', function (Blueprint $table) {
            $table->foreignUuid('staff_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('service_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('tenant_id');
            $table->primary(['staff_id', 'service_id']);
        });

        Schema::create('shifts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('staff_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('location_id')->constrained()->cascadeOnDelete();
            $table->timestampTz('starts_at');
            $table->timestampTz('ends_at');
            $table->text('note')->nullable();
            $table->timestampsTz();
            $table->index(['tenant_id', 'staff_id', 'starts_at']);
        });

        Schema::create('time_off', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('staff_id')->constrained()->cascadeOnDelete();
            $table->rawColumn('period', 'tstzrange');
            $table->string('reason')->nullable();
            $table->timestampsTz();
            $table->index('tenant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('time_off');
        Schema::dropIfExists('shifts');
        Schema::dropIfExists('staff_skills');
        Schema::dropIfExists('staff');
    }
};
