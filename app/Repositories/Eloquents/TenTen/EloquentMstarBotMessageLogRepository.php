<?php

namespace App\Repositories\Eloquents\TenTen;

use App\Models\MstarBotMessageLog;
use App\Contracts\Repositories\TenTen\MstarBotMessageLogRepository;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentMstarBotMessageLogRepository extends EloquentBaseRepository implements MstarBotMessageLogRepository
{
    protected $model;

    public function __construct(MstarBotMessageLog $model)
    {
        $this->model = $model;
    }
}
