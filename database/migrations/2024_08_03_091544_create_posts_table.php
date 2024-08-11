<?php

use App\Enums\PostStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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

            $table->text('address')->nullable();
            $table->foreignId('country_id')->nullable()->constrained('countries')->onUpdate('cascade')->onDelete('set null');

            $table->foreignId('created_by_user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('user_phone_id')->nullable()->constrained('user_contacts')->onUpdate('cascade')->onDelete('set null');

            $table->foreignId('purpose_id')->nullable()->constrained('post_purposes')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('level_id')->nullable()->constrained('levels')->onUpdate('cascade')->onDelete('set null');

            $table->enum('gender_preference', ['male', 'female', 'any'])->default('any');
            $table->enum('status', array_column(PostStatus::cases(), 'value'))->default(PostStatus::OPEN->value);

            $table->decimal('min_budget', 7, 2)->default(0);
            $table->decimal('max_budget', 7, 2)->default(0);
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
