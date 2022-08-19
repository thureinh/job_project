<?php

use App\Http\Controllers\RouteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('routes', RouteController::class);
    Route::get('/name-check', [RouteController::class, 'isDuplicated']);
});
Route::get('/locations', [RouteController::class, 'getLocations']);
Route::get('/search', [RouteController::class, 'searchRoutes']);
Route::post('/get-ticket', [RouteController::class, 'getTicket']);