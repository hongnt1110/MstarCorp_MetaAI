<?php

namespace App\Repositories\Eloquents\OpenAI;

use App\Models\Bitrix24;
use App\Contracts\Repositories\OpenAI\ChatGPTRepository;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentChatGPTRepository extends EloquentBaseRepository implements ChatGPTRepository
{
    protected $model;

    public function __construct(Bitrix24 $model)
    {
        $this->model = $model;
    }
}
