<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name' => 'Adhaar card', 'is_required' => true, 'needs_verification' => true],
            ['name' => 'Pan card', 'is_required' => false, 'needs_verification' => true],
            ['name' => 'Passport', 'is_required' => false, 'needs_verification' => false],
            ['name' => 'Driving license', 'is_required' => false, 'needs_verification' => true],
            ['name' => 'Voter ID card', 'is_required' => false, 'needs_verification' => true],
            ['name' => 'Matriculation certificate', 'is_required' => true, 'needs_verification' => true],
            ['name' => 'Highest degree certificate', 'is_required' => true, 'needs_verification' => true],
        ];

        foreach ($types as $type) {
            \App\Models\DocumentType::create($type);
        }
    }
}
