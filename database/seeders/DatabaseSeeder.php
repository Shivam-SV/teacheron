<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use League\CommonMark\Node\Block\Document;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(RoleSeeder::class);
        // $this->call(CountriesSeeder::class);
        // $this->call(LanguagesSeeder::class);
        // $this->call(PaymentMethodsSeeder::class);
        $this->call(DocumentTypeSeeder::class);
    }
}
