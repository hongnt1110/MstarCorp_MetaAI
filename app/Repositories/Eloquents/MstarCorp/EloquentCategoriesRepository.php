<?php

namespace App\Repositories\Eloquents\MstarCorp;

use App\Contracts\Repositories\MstarCorp\CategoriesRepository;
use App\Models\Categories;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentCategoriesRepository extends EloquentBaseRepository implements CategoriesRepository
{
    protected $model;

    public function __construct(Categories $model)
    {
        $this->model = $model;
    }
}
