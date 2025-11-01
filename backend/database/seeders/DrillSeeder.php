<?php

namespace Database\Seeders;

use App\Models\Drill;
use App\Models\DrillCategory;
use App\Models\Move;
use Illuminate\Database\Seeder;

class DrillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $drills = [
            [
                "id" => 1,
                "name" => "Vorhand Eröffnung auf Schupf",
                "description" => "",
                "owner_id" => 1,
                "moves" => [
                    [
                        "order" => 0,
                        "from" => "a-1-1",
                        "to" => "b-3-3",
                        "instruction" => "Kurzer Aufschlag",
                        "color" => "yellow"
                    ],
                    [
                        "order" => 1,
                        "from" => "b-3-3",
                        "to" => "a-3-1",
                        "instruction" => "Langer Schupf in die Vorhand",
                        "color" => "red"
                    ],
                    [
                        "order" => 2,
                        "from" => "a-3-1",
                        "to" => "b-1-1",
                        "instruction" => "Topspin Eröffnung auf Rückhand",
                        "color" => "green"
                    ]
                ]
            ],
            [
                "id" => 2,
                "name" => "Vorhandflip",
                "description" => "",
                "owner_id" => 1,
                "moves" => [
                    [
                        "order" => 0,
                        "from" => "a-2-1",
                        "to" => "b-2-3",
                        "instruction" => "Kurzer Aufschlag",
                        "color" => "yellow"
                    ],
                    [
                        "order" => 1,
                        "from" => "b-2-3",
                        "to" => "a-3-3",
                        "instruction" => "Kurz zurück",
                        "color" => "red"
                    ],
                    [
                        "order" => 2,
                        "from" => "a-3-3",
                        "to" => "b-3-1",
                        "instruction" => "Flip Eröffnung auf Rückhand",
                        "color" => "green"
                    ]
                ]
            ],
        ];

        DrillCategory::create([
            'id' => 1,
            'name' => 'Technik',
            'color' => '#ff3333ff',
        ]);

        DrillCategory::create(array(
            'id' => 2,
            'name' => 'Aufschlage',
            'color' => '#47e318ff',
        ));

        DrillCategory::create([
            'id' => 3,
            'name' => 'Schnelligkeit',
            'color' => '#0e39e1ff',
        ]);

        DrillCategory::create([
            'id' => 4,
            'name' => 'Platzierung',
            'color' => '#ffe433ff',
        ]);

        foreach ($drills as $drill) {
            Drill::create([
                'id' => $drill['id'],
                'name' => $drill['name'],
                'description' => $drill['description'],
                "owner_id" => 1,
                'drill_category_id' => 1,
            ]);

            foreach ($drill["moves"] as $move) {
                $move["drill_id"] = $drill["id"];
                Move::create($move);
            }
        }
    }
}
