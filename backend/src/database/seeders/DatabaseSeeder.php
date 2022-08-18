<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        DB::table('locations')->truncate();
        DB::table('users')->insert([
            'name' => 'admin',
            'password' => Hash::make('root'),
        ]);
        $contents = json_decode(Storage::get('mm.json'), true);
        foreach ($contents as $city) {
            DB::table('locations')->insert([
                'name' => $city['city']
            ]);
        }
    }
}
