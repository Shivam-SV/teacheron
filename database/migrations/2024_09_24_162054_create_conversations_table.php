<?php

use App\Enums\ConversationStatus;
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
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->foreignId('teacher_id')->constrained('users');
            $table->foreignId('student_id')->constrained('users');
            $table->foreigbId('post_purchases_id')->nullable()->constrained('post_purchases');
            $table->enum('status', array_column(ConversationStatus::cases(), 'value'))->default('initial');
            $table->timestamp('last_message_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
