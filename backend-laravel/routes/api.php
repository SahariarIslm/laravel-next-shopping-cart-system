<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;

// Public routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Protected routes
Route::middleware('firebase.auth')->group(function () {
    // User routes
    Route::post('/user/sync', [UserController::class, 'syncUser']);
    Route::get('/user', [UserController::class, 'show']);

    // Cart routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/batch-update', [CartController::class, 'batchUpdate']);
    Route::delete('/cart/{product_id}', [CartController::class, 'destroy']);
});
