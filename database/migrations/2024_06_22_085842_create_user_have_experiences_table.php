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
        Schema::create('user_have_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('organisation_name', 100)->nullable();
            $table->string('organisation_type', 40)->nullable();
            $table->string('designation', 70)->nullable();
            $table->unsignedInteger('experience_in_years')->nullable();
            $table->unsignedInteger('experience_in_months')->nullable();
            $table->text('description_about_role')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_have_experiences');
    }
};
