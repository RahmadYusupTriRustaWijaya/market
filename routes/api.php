<?php

use App\Http\Controllers\{
    BrandController, CategoryController, ProductController,
    OrderController, OrderItemController, AddressController
};
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


Route::apiResources([
    'brands' => BrandController::class,
    'categories' => CategoryController::class,
    'products' => ProductController::class,
    'orders' => OrderController::class,
    'users' => \App\Http\Controllers\UserController::class,
]);

Route::apiResource('order-items', OrderItemController::class)->only(['index', 'show', 'destroy']);
Route::apiResource('addresses', AddressController::class);
