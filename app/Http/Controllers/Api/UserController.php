<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\MstarCorp\UserRepository;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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
        try {
            $result = $this->userRepository->getAll();

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $result = $this->userRepository->create($data);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $data = $request->all();
            $result = $this->userRepository->update($data, $id);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => $e->getMessage(), 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }

    public function destroy($id)
    {
        try {
            $result = $this->userRepository->delete($id);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }

    public function find($id)
    {
        try {
            $result = $this->userRepository->find($id);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }
}
