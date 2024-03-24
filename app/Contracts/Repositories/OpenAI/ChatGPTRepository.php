<?php

namespace App\Contracts\Repositories\OpenAI;

use App\Contracts\Repositories\BaseRepository;

interface ChatGPTRepository extends BaseRepository
{
    public function callChatGPTApi($question);
}
