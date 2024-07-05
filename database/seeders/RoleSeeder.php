<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'student','meta' => 'Can post own requirement to get a teacher'],
            ['name' => 'teacher', 'meta' => 'Fullfill the requirements of the students, according to their needs'],
            ['name' => 'admin', 'meta' => 'Controls the system, operates the events and others']
         ];
        foreach($roles as $role){
            Role::create($role);
        }
    }
}
