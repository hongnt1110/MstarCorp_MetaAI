<?php

namespace App\Repositories\Eloquents\ChatGPT;

use App\Contracts\Repositories\OpenAI\ChatGPTMessageLogRepository;
use App\Models\MstarBotMessageLog;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentChatGPTMessageLogRepository extends EloquentBaseRepository implements ChatGPTMessageLogRepository
{
    protected $model;

    public function __construct(MstarBotMessageLog $model)
    {
        $this->model = $model;
    }
}
