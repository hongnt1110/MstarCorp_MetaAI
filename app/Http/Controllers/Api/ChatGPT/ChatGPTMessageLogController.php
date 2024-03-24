<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\OpenAI\ChatGPTMessageLogRepository;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class ChatGPTMessageLogController extends Controller
{
    protected $chatGPTMessageLogRepository;

    public function __construct(
        ChatGPTMessageLogRepository $chatGPTMessageLogRepository
    ) {
        $this->chatGPTMessageLogRepository = $chatGPTMessageLogRepository;
    }

    public function index()
    {
        $result = $this->chatGPTMessageLogRepository->getAll();
        return response()->json(["data" => $result, "status" => 200], 200);
    }
}
