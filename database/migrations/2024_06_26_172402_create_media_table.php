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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('model_name');
            $table->unsignedBigInteger('model_id');
            $table->string('model_column');
            $table->text('file_name');
            $table->enum('source', ['storage', 'web'])->default('storage');
            $table->string('original_file_name')->nullable();
            $table->text('file_path')->nullable();
            $table->string('file_extension')->nullable();
            $table->string('file_mime')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
