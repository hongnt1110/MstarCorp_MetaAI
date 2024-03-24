<?php

namespace App\Repositories\Eloquents\Bitrix24;

use App\Models\Bitrix24;
use App\Contracts\Repositories\Bitrix24\Bitrix24Repository;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentBitrix24Repository extends EloquentBaseRepository implements Bitrix24Repository
{
    protected $model;

    public function __construct(Bitrix24 $model)
    {
        $this->model = $model;
    }
}
