<?php

namespace App\Http\Controllers\Products\ZaloOA;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ZaloOAController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/ZaloOA/ZaloOA');
    }
}
