<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


//Route::group(['prefix' => 'api'], function () {
//    Route::post('/register', [RegisterController::class, 'register'])->name('register');
//    Route::post('/login', [RegisterController::class, 'register'])->name('register');
//});
//Route::get('{any}', function () {
//    return view('welcome');
//})->where('any', '.*');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
