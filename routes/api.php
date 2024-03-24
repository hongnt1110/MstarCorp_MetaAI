<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MstarBotController;
use App\Http\Controllers\Api\MstarBotMessageLogController;
use App\Http\Controllers\Api\ChatGPT\ChatGPTController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\ModelsController;
use App\Http\Controllers\Api\PromptsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('MstarBot')->namespace('MstarBot')->name('MstarBot.')->group(function () {
    Route::get('/', [MstarBotController::class, 'index'])->name('index');
    Route::match(['get', 'post'], '/install', [MstarBotController::class, 'install'])->name('install');
    Route::post('/event', [MstarBotController::class, 'handleEvent'])->name('handleEvent');
});
// =================================
Route::prefix('ChatGPT')->namespace('ChatGPT')->name('ChatGPT.')->group(function () {
    Route::get('/', [ChatGPTController::class, 'index'])->name('index');
    Route::match(['get', 'post'], '/install', [ChatGPTController::class, 'install'])->name('install');
    Route::post('/event', [ChatGPTController::class, 'handleEvent'])->name('handleEvent');
});
// =================================
Route::prefix('users')->namespace('users')->name('users.')->group(function () {
    Route::get('/list', [UserController::class, 'index'])->name('list');
    Route::post('/create', [UserController::class, 'store'])->name('create');
    Route::put('/update/{id}', [UserController::class, 'update'])->name('update');
    Route::delete('/delete/{id}', [UserController::class, 'destroy'])->name('delete');
    Route::get('/find/{id}', [UserController::class, 'find'])->name('find');
})->name('users');
// =================================
Route::prefix('categories')->namespace('categories')->name('categories.')->group(function () {
    Route::get('/list', [CategoriesController::class, 'index'])->name('list');
    Route::post('/create', [CategoriesController::class, 'store'])->name('create');
    Route::put('/update/{id}', [CategoriesController::class, 'update'])->name('update');
    Route::delete('/delete/{id}', [CategoriesController::class, 'destroy'])->name('delete');
    Route::get('/find/{id}', [CategoriesController::class, 'find'])->name('find');
})->name('categories');
// =================================
Route::prefix('models')->namespace('models')->name('models.')->group(function () {
    Route::get('/list', [ModelsController::class, 'index'])->name('list');
    Route::post('/create', [ModelsController::class, 'store'])->name('create');
    Route::put('/update/{id}', [ModelsController::class, 'update'])->name('update');
    Route::delete('/delete/{id}', [ModelsController::class, 'destroy'])->name('delete');
    Route::get('/find/{id}', [ModelsController::class, 'find'])->name('find');
})->name('models');
// =================================
Route::prefix('prompts')->namespace('prompts')->name('prompts.')->group(function () {
    Route::get('/list', [PromptsController::class, 'index'])->name('list');
    Route::post('/create', [PromptsController::class, 'store'])->name('create');
    Route::put('/update/{id}', [PromptsController::class, 'update'])->name('update');
    Route::delete('/delete/{id}', [PromptsController::class, 'destroy'])->name('delete');
    Route::get('/find/{id}', [PromptsController::class, 'find'])->name('find');
    Route::put('/change-status/{id}', [PromptsController::class, 'update'])->name('change-status');
})->name('prompts');
