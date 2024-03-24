<?php

namespace App\Repositories\Eloquents\MstarCorp;

use App\Contracts\Repositories\MstarCorp\PromptsRepository;
use App\Models\Prompts;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentPromptsRepository extends EloquentBaseRepository implements PromptsRepository
{
    protected $model;

    public function __construct(Prompts $model)
    {
        $this->model = $model;
    }
}