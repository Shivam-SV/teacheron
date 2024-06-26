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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->text('description')->nullable();
            $table->foreignId('created_by_user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->enum('purpose', ['assignment_help', 'homework_help', 'tutions', 'guidance'])->nullable();
            $table->foreignId('subject_id')->constrained('subjects')->onUpdate('cascade')->onDelete('cascade');
            $table->enum('experties', ['beginner', 'intermediate', 'expert', 'professional'])->nullable();
            $table->foreignId('level_id')->nullable()->constrained('levels')->onUpdate('cascade')->onDelete('set null');
            $table->enum('gender_preference', ['male', 'female', 'any'])->default('any');
            $table->enum('status', ['open', 'on-hold', 'fulfilled', 'cancel'])->default('open');
            $table->unsignedDecimal('min_budget', 7, 2)->default(0);
            $table->unsignedDecimal('max_budget', 7, 2)->default(0);
            $table->string('budget_currency_code', 10)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
