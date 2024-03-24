<?php

use App\Http\Controllers\Api\MstarBotMessageLogController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Backend\CategoriesController;
use App\Http\Controllers\Products\ZaloOA\ZaloOAController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->prefix('Admin')->namespace('Admin')->name('Admin.')->group(function () {
    //Dashboard admin
    Route::get('/Dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    //User
    Route::prefix('Users')->namespace('MstarBot')->name('Users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('Users');
    })->middleware(['auth', 'verified'])->name('users');

    //Prompts
    Route::prefix('Prompts')->namespace('MstarBot')->name('Prompts.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Prompts');
        })->name('Prompts');
    })->middleware(['auth', 'verified'])->name('prompts');

    //Models
    Route::prefix('Models')->namespace('MstarBot')->name('Models.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Models');
        })->name('Models');
    })->middleware(['auth', 'verified'])->name('models');

    //Categories
    Route::prefix('Categories')->namespace('MstarBot')->name('Categories.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Categories');
        })->name('Categories');
    })->middleware(['auth', 'verified'])->name('categories');

    //Categories
    Route::prefix('Subcription')->namespace('MstarBot')->name('Subcription.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Subcription');
        })->name('Subcription');
    })->middleware(['auth', 'verified'])->name('subcription');
    //Mstar Bot

    Route::prefix('MstarBot')->namespace('MstarBot')->name('MstarBot.')->group(function () {
        Route::get('/message_log', [MstarBotMessageLogController::class, 'index'])->name('messageLog');
    });
});

Route::prefix('Bitrix24')->namespace('Bitrix24')->name('Bitrix24.')->group(function () {
    Route::prefix('ZaloOA')->namespace('ZaloOA')->name('ZaloOA.')->group(function () {
        Route::get('/', [ZaloOAController::class, 'index'])->name('index');

    })->name('ZaloOA');
})->name('bitrix24');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/Admin', function () {
    return Inertia::render('Admin');
})->name('admin');

Route::get('/Test', function () {
    return Inertia::render('Test');
})->name('test');

Route::get('/View', function () {
    return Inertia::render('View');
})->name('view');

require __DIR__ . '/auth.php';
