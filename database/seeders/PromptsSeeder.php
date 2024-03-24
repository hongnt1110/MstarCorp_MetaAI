<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromptsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('prompts')->insert([
            [
                'title' => 'Công thức nấu ăn từ các thành phần tủ lạnh',
                'categories' => '["Food"]',
                'models' => '["GPT-4"]',
                'prompt' => 'Please act like native speaker of the language Tiếng Việt and also Respond in the target language Tiếng Việt. I’m going to give you a list of ingredients in my fridge and you will come up with 3-5 recipes using listed ingredients.
                Then, ask me which recipe I want to do by choosing a number, when I pick a number, you will give me full details of that recipe.

                Assume I have access to salt and pepper, butter, sugar, common spices and other various cooking essentials.

                Here is the list of ingredients: {{Context}}',
                'status' => 1,
                'placeholder' => 'placeholder',

                'description' => 'Liệt kê các nội dung của tủ lạnh của bạn',
            ],
            [
                'title' => 'Optima - Trợ lý giúp đặt mục tiêu S.M.A.R.T',
                'categories' => '["SEO"]',
                'models' => '["GPT-4"]',
                'prompt' => 'Please act like native speaker of the language Tiếng Việt and also Respond in the target language Tiếng Việt. I’m going to give you a list of ingredients in my fridge and you will come up with 3-5 recipes using listed ingredients.
                Then, ask me which recipe I want to do by choosing a number, when I pick a number, you will give me full details of that recipe.

                Assume I have access to salt and pepper, butter, sugar, common spices and other various cooking essentials.

                Here is the list of ingredients: {{Context}}',
                'status' => 1,
                'placeholder' => 'placeholder',

                'description' => 'Trợ lý này sẽ giúp biến mục tiêu của bạn thành mục tiêu cuiar S.M.A.R.T',
            ],
            [
                'title' => 'Công thức nấu ăn từ các thành phần tủ lạnh',
                'categories' => '["Optimize"]',
                'models' => '["GPT-3.5, GPT-4"]',
                'prompt' => 'Prompt 3',
                'status' => 1,
                'placeholder' => 'placeholder',

                'description' => 'Liệt kê các nội dung của tủ lạnh của bạn',
            ],
        ]);
        DB::table('models')->insert([
            [
                'name' => 'GPT-3.5'
            ],
            [
                'name' => 'GPT-4'
            ],
            [
                'name' => 'GPT-4-turbo'
            ],
        ]);
        DB::table('categories')->insert([
            [
                'name' => 'A'
            ],
            [
                'name' => 'B'
            ],
            [
                'name' => 'SEO'
            ],
            [
                'name' => 'Optimize'
            ],
            [
                'name' => 'Food'
            ],
        ]);
    }
}
