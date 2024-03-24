<?php

namespace App\Repositories\Eloquents\ChatGPT;

use App\Models\MstarBot;
use App\Contracts\Repositories\OpenAI\ChatGPTRepository;
use App\Repositories\Eloquents\EloquentBaseRepository;
use Illuminate\Support\Facades\Http;

class EloquentChatGPTRepository extends EloquentBaseRepository implements ChatGPTRepository
{
    protected $model;

    public function __construct(MstarBot $model)
    {
        $this->model = $model;
    }

    public function callChatGPTApi($question)
    {
        $url = 'https://api.openai.com/v1/chat/completions';
        $data = [
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    'role' => 'assistant',
                    'content' => $question
                ]
            ],
            'temperature' => 0.7
        ];

        $responseData = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('CHAT_GPT_KEY'),
            'Content-Type' => 'application/json'
        ])->post($url, $data);


        return $responseData->json();
    }
}
