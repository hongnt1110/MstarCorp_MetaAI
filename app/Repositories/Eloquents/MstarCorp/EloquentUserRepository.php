<?php

namespace App\Repositories\Eloquents\MstarCorp;

use App\Contracts\Repositories\MstarCorp\UserRepository;
use App\Models\User;
use App\Repositories\Eloquents\EloquentBaseRepository;

class EloquentUserRepository extends EloquentBaseRepository implements UserRepository
{
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }
}
