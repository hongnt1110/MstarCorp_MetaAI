<?php

namespace App\Repositories\Eloquents\Zalo;

use App\Models\ZaloOA;
use App\Contracts\Repositories\Zalo\ZaloRepository;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentZaloRepository extends EloquentBaseRepository implements ZaloRepository
{
    protected $model;

    public function __construct(ZaloOA $model)
    {
        $this->model = $model;
    }
}
