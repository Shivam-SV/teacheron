<?php

use App\Http\Controllers\UserController;
use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

# frontend routes
Route::inertia('/', 'index')->name('home');
Route::inertia('/login', 'Auth/Login')->name('login');
Route::get('/sign-in', function(){
    return Inertia::render('Auth/Register', [
        'roles' => Role::get()
    ]);
});

Route::get('/profile/{userId?}', [UserController::class, 'Profile']);


/**
 * Backend Routes
 */

# Authentication Routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::get('send-verification-email/{userId}', [UserController::class, 'sendVerificationEmail'])->name('send-verification-email');
Route::get('verify-email/{userId}', [UserController::class, 'verifyEmail'])->name('verify-email');

# google auth routes
Route::get('/google/redirect', [UserController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/google/authenticateUser', [UserController::class, 'authenticateGoogleUser'])->name('google.authenticate');
