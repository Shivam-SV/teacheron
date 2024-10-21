<?php

use App\Enums\PostPurchaseStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('purchase_by')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->enum('status', array_column(PostPurchaseStatus::cases(), 'value'))->default('initiated');
            $table->dateTime('purchase_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_purchases');
    }
};
