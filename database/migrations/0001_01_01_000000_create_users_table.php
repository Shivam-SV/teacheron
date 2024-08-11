<?php

use App\Enums\UserStatus;
use App\Enums\UserLoginTypes;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->text('bio')->nullable();
            $table->string('address', 200)->nullable();
            $table->foreignId('country_id')->nullable()->constrained('countries');
            $table->string('email', 100)->unique();
            $table->string('password', 255)->nullable();
            $table->text('google_id')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->enum('gender', ['male', 'female', 'not specified'])->default('not specified');
            $table->date('date_of_birth')->nullable();
            $table->enum('status', array_column(UserStatus::cases(), 'value'))->default(UserStatus::ACTIVE->value);
            $table->dateTime('status_updated_at')->nullable();
            $table->dateTime('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('have_password')->default(1)->comment('0 for social login, guest, 1 for general web login');
            $table->enum('user_login_type', array_column(UserLoginTypes::cases(), 'value'))->default(UserLoginTypes::WEB->value);
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
