<?php

use App\Http\Controllers\DrillController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('drills', DrillController::class);
    Route::get('/users', [UserController::class, 'index']);
    Route::patch('/users/{user}/toggle-active', [UserController::class, 'toggleActive']);
});
