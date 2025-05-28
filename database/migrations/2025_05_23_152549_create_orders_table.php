<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('grand_total', 12, 2)->default(0);
            $table->string('payment_method')->nullable();
            $table->string('payment_status')->default('unpaid'); // e.g., unpaid, paid
            $table->string('status')->default('pending'); // e.g., pending, shipped, delivered
            $table->string('currency', 10)->default('IDR');
            $table->decimal('shipping_amount', 12, 2)->default(0);
            $table->string('shipping_method')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
