<?php

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
        Schema::create('user_tutoring_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->enum('duration_period', ['hourly', 'daily', 'monthly', 'quaterly', 'yearly']);
            $table->decimal('min_price', 10, 2)->nullable();
            $table->decimal('max_price', 10, 2)->nullable();
            $table->text('prive_varing_description')->nullable();
            $table->decimal('total_experience', 3, 1)->default(0);
            $table->decimal('online_experience', 3, 1)->default(0);
            $table->decimal('offline_experience', 3, 1)->default(0);
            $table->boolean('can_travel')->default(0);
            $table->decimal('travel_kms', 7, 2)->default(0);
            $table->boolean('can_teach_online')->default(0);
            $table->boolean('have_digital_pen')->default(0);
            $table->boolean('can_help_with_homework')->default(0);
            $table->boolean('currently_working')->default(0);
            $table->enum('looking_for_duration', ['part-time', 'full-time', 'both'])->default('full-time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_tutoring_details');
    }
};
