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
         // Posts Table
         Schema::table('posts', function (Blueprint $table) {
            // Add Fulltext Index
            $table->fullText(['title', 'description', 'address']);
        });

        // Countries Table
        Schema::table('countries', function (Blueprint $table) {
            $table->fullText('name');
        });

        // Post Purposes Table
        Schema::table('post_purposes', function (Blueprint $table) {
            $table->fullText(['name', 'slug', 'description']);
        });

        // Levels Table
        Schema::table('levels', function (Blueprint $table) {
            $table->fullText(['name', 'slug', 'group_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Posts Table
        Schema::table('posts', function (Blueprint $table) {
            $table->dropIndex('posts_title_description_address_fulltext');
        });

        // Countries Table
        Schema::table('countries', function (Blueprint $table) {
            $table->dropIndex('countries_name_fulltext');
        });

        // Post Purposes Table
        Schema::table('post_purposes', function (Blueprint $table) {
            $table->dropIndex('post_purposes_name_slug_description_fulltext');
        });

        // Levels Table
        Schema::table('levels', function (Blueprint $table) {
            $table->dropIndex('levels_name_slug_group_name_fulltext');
        });
    }
};
