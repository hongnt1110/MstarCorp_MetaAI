<?php

namespace App\Repositories\Eloquents\MstarCorp;

use App\Contracts\Repositories\MstarCorp\ModelsRepository;
use App\Models\Models;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentModelsRepository extends EloquentBaseRepository implements ModelsRepository
{
    protected $model;

    public function __construct(Models $model)
    {
        $this->model = $model;
    }
}