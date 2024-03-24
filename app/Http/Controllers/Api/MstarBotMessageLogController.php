<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\TenTen\MstarBotMessageLogRepository;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class MstarBotMessageLogController extends Controller
{
    protected $mstarBotMessageLogRepository;

    public function __construct(
        MstarBotMessageLogRepository $mstarBotMessageLogRepository
    ) {
        $this->mstarBotMessageLogRepository = $mstarBotMessageLogRepository;
    }

    public function index()
    {
        $result = $this->mstarBotMessageLogRepository->getAll();
        return response()->json(["data" => $result, "status" => 200], 200);
    }
}
