<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('routes')->truncate();
        for ($i = 0; $i < 60; $i++) {
            DB::table('routes')->insert([
                'car_name'   => Str::random(5),
                'from'       => 1,
                'to'         => 1,
                'date'       => '2022-08-22',
                'seat_count' => 30
            ]);
        }
    }
}
