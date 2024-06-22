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
        Schema::create('medias', function (Blueprint $table) {
            $table->id();
            $table->string('model_name', 255);
            $table->unsignedBigInteger('model_id');
            $table->string('model_column', 255);
            $table->text('file_name');
            $table->text('original_file_name');
            $table->string('file_path', 255)->nullable();
            $table->string('file_extension', 10)->nullable();
            $table->string('file_mime', 20)->nullable();
            $table->foreignId('created_by_user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medias');
    }
};
