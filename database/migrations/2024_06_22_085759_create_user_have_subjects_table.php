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
        Schema::create('user_have_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subjects')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('user_subject_has_levels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_have_subject_id')->constrained('user_have_subjects')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('level_id')->constrained('levels')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_have_subjects');
        Schema::dropIfExists('user_subject_has_levels');
    }
};
