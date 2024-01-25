<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuarioController;
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

Route::post('newUser', [UsuarioController::class, 'addNewUser']);
Route::get('getAllUser/{id}', [UsuarioController::class, 'getAllUser']);

Route::post('login', [LoginController::class, 'login']);

Route::post('newEvent', [EventController::class, 'newEvent']);
Route::get('getAllEvents/{id}', [EventController::class, 'getEvents']);
Route::put('updateEvent', [EventController::class, 'changeEvent']);
Route::delete('deleteEvent/{id}', [EventController::class, 'delEvent']);
Route::get('getEventById/{id}', [EventController::class, 'findEventById']);

Route::post('sendInvite', [InviteController::class, 'sendInvite']);
Route::get('getInvites/{id}', [InviteController::class, 'getInvites']);
Route::put('rejectInvite', [InviteController::class, 'rejectInvite']);
Route::put('acceptInvite', [InviteController::class, 'acceptInvite']);
Route::get('aceptedEvents/{id}', [InviteController::class, 'aceptedEvents']);
