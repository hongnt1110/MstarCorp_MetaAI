<?php

namespace App\Repositories\Eloquents\TenTen;

use App\Models\MstarBot;
use App\Contracts\Repositories\TenTen\MiraBotRepository;
use App\Repositories\Eloquents\EloquentBaseRepository;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EloquentMiraBotRepository extends EloquentBaseRepository implements MiraBotRepository
{
    protected $model;

    public function __construct(MstarBot $model)
    {
        $this->model = $model;
    }

    public function callMiraAPI($conversationId, $token_bot, $question)
    {
        $url = 'https://aibot-live.gmosaas.net/api/v1/chatbot';
        $payload = [
            'conversation_id' => $conversationId,
            'token_bot' => $token_bot,
            'question' => $question,
            'language' => 'vi'
        ];
        $responseData = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post($url, $payload);

        return $responseData->json();
    }

    public function createConversationId()
    {
        $BotId = env('BotId');
        $AccessTokenMiraBot = env('AccessTokenMiraBot');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $AccessTokenMiraBot
        ])->post('https://docsbot-live.gmosaas.net/api/bots/conversation', [
            "bot_id" => $BotId,
        ]);
        Log::info('createConversationId', [$BotId]);
        return $response->json();
    }

    public function findByDialogId($dialogId, $url)
    {
        return MstarBot::where('dialog_id', $dialogId)
            ->where('url', $url)
            ->first();
    }
}
