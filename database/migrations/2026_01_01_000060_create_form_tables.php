<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('form_versions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('form_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('version');
            $table->jsonb('fields'); // [{id, type: bool_seg|segment|textarea, label, options}]
            $table->text('consent_text')->nullable();
            $table->timestampTz('published_at')->nullable();
            $table->timestampsTz();
            $table->index(['tenant_id', 'form_id']);
        });

        Schema::create('form_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('form_version_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('booking_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignUuid('client_id')->nullable()->constrained()->nullOnDelete();
            $table->string('guest_name')->nullable();
            $table->text('answers')->nullable(); // encrypted JSON
            $table->text('signature')->nullable(); // encrypted SVG path
            $table->string('signed_name')->nullable();
            $table->timestampTz('signed_at')->nullable();
            $table->timestampTz('expires_at')->nullable(); // validity window, e.g. 12 months
            $table->timestampsTz();
            $table->index(['tenant_id', 'booking_id']);
            $table->index(['tenant_id', 'client_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
        Schema::dropIfExists('form_versions');
    }
};
