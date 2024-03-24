<?php

namespace App\Http\Controllers\Admin;

use App\Contracts\Repositories\MstarCorp\UserRepository;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(
        UserRepository $userRepository,
    ) {
        $this->userRepository = $userRepository;
    }


    public function index()
    {
        return Inertia::render('Users');
    }
}
