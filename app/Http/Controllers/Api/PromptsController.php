<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\MstarCorp\PromptsRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;

class PromptsController extends Controller
{
    protected $PromptsRepository;
    public function __construct(
        PromptsRepository $PromptsRepository,
    ) {
        $this->PromptsRepository = $PromptsRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $result = $this->PromptsRepository->getAll();
            foreach ($result as $key => $value) {
                if ($key === 'models' || $key === 'categories') {
                    $result[$key] = json_decode($value);
                }
            }
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
            foreach ($data as $key => $value) {
                // Kiểm tra nếu $key là 'models' hoặc 'categories'
                if ($key === 'models' || $key === 'categories') {
                    // Chuyển đổi giá trị thành mảng (nếu chưa là mảng)
                    $value = is_array($value) ? $value : [$value];

                    // Chuyển đổi mảng thành chuỗi JSON
                    $data[$key] = json_encode($value);
                }
            }
            $result = $this->PromptsRepository->create($data);

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
            foreach ($data as $key => $value) {
                if ($key === 'models' || $key === 'categories') {
                    $data[$key] = json_encode($value);
                }
            }
            $result = $this->PromptsRepository->update($data, $id);

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
            $result = $this->PromptsRepository->delete($id);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }
    public function find($id)
    {
        try {
            $result = $this->PromptsRepository->find($id);

            return response()->json(["data" => $result, "status" => 200], 200);
        } catch (Exception $e) {

            return response()->json(["data" => "error", 'status' => 400, "message" => "Lỗi không thấy"]);
        }
    }
}
