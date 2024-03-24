<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\MstarCorp\CategoriesRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;

class CategoriesController extends Controller
{
    protected $CategoriesRepository;
    public function __construct(
        CategoriesRepository $CategoriesRepository,
    ) {
        $this->CategoriesRepository = $CategoriesRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $result = $this->CategoriesRepository->getAll();

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $result = $this->CategoriesRepository->create($data);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $data = $request->all();
            $result = $this->CategoriesRepository->update($data, $id);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $result = $this->CategoriesRepository->delete($id);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }
    public function find($id)
    {
        try {
            $result = $this->CategoriesRepository->find($id);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }
}
