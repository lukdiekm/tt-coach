<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => '$2y$12$bYEkbKbrX5TZgJfhuhx5SuJ81gBa4mkhDm5KS3eMlhE/lmc4oQWsG',
        ]);
  
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '$2y$12$bYEkbKbrX5TZgJfhuhx5SuJ81gBa4mkhDm5KS3eMlhE/lmc4oQWsG',
        ]);

        $this->call([
            DrillSeeder::class,
        ]);
    }
}
