<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('booking_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignUuid('client_id')->nullable()->constrained()->nullOnDelete();
            $table->string('gateway', 16); // stripe / midtrans / xendit / sandbox
            $table->string('method', 16)->nullable(); // card / qris / va / ewallet
            $table->string('kind', 16); // deposit / balance / tip / no_show_fee / refund / package / gift_card
            $table->bigInteger('amount');
            $table->string('status', 12)->default('pending'); // pending / succeeded / failed / refunded
            $table->string('provider_ref')->nullable();
            $table->string('idempotency_key')->unique();
            $table->jsonb('meta')->nullable();
            $table->timestampTz('paid_at')->nullable();
            $table->timestampTz('refunded_at')->nullable();
            $table->timestampsTz();
            $table->index(['tenant_id', 'booking_id']);
            $table->index(['tenant_id', 'status']);
        });

        Schema::create('tips', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('payment_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('staff_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('booking_id')->nullable()->constrained()->nullOnDelete();
            $table->bigInteger('amount');
            $table->timestampsTz();
            $table->index(['tenant_id', 'staff_id']);
        });

        Schema::create('reminders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('booking_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('kind', 20); // confirmation / h1 / h2 / review / form / package
            $table->string('channel', 12); // email / whatsapp
            $table->timestampTz('send_at');
            $table->timestampTz('sent_at')->nullable();
            $table->string('status', 12)->default('pending'); // pending / sent / failed / skipped / cancelled
            $table->text('body')->nullable(); // rendered snapshot
            $table->timestampsTz();
            $table->index(['tenant_id', 'status', 'send_at']);
        });

        // P2: auto-fill cancelled slots. Table exists so the data model is final.
        Schema::create('waitlist_entries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('client_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('service_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('location_id')->constrained()->cascadeOnDelete();
            $table->rawColumn('window', 'tstzrange');
            $table->unsignedSmallInteger('party_size')->default(1);
            $table->string('status', 12)->default('waiting'); // waiting / offered / booked / expired
            $table->timestampsTz();
            $table->index('tenant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('waitlist_entries');
        Schema::dropIfExists('reminders');
        Schema::dropIfExists('tips');
        Schema::dropIfExists('payments');
    }
};
