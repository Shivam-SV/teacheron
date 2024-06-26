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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email', 100)->unique();
            $table->text('alternate_emails')->nullable()->comment('JSON column');
            $table->text('alternate_phone')->nullable()->comment('JSON column');
            $table->text('languages_known')->nullable()->comment('JSON column');
            $table->string('password', 255)->nullable();
            $table->text('google_id')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->enum('gender', ['male', 'female', 'not specified'])->default('not specified');
            $table->date('date_of_birth')->nullable();
            $table->enum('status', ['deactive', 'active', 'suspended', 'banned'])->default('active');
            $table->dateTime('status_updated_at')->nullable();
            $table->dateTime('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('have_password')->default(1)->comment('0 for social login, guest, 1 for general web login');
            $table->enum('user_login_type', ['web', 'social', 'guest'])->default('web');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
