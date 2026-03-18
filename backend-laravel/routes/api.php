<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

// Public routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Protected routes
Route::middleware('firebase.auth')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/batch-update', [CartController::class, 'batchUpdate']);
    Route::delete('/cart/{product_id}', [CartController::class, 'destroy']);
});
