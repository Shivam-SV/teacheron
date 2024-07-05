<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\UserController;
use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

# --------------
# Frontend Routes
# --------------

Route::inertia('/', 'Index')->name('home');
Route::inertia('/login', 'Auth/Login')->name('login');
Route::get('/sign-in', function () {
    return Inertia::render('Auth/Register', [
        'roles' => Role::get()
    ]);
});

Route::get('/profile/{userId?}', [UserController::class, 'Profile']);

# --------------
# Backend Routes
# --------------

# Authentication Routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::get('send-verification-email/{userId}', [UserController::class, 'sendVerificationEmail'])->name('send-verification-email');
Route::get('verify-email/{userId}', [UserController::class, 'verifyEmail'])->name('verify-email');
Route::post('/logout', [UserController::class, 'logout'])->name('logout');

# google auth routes
Route::get('/google/redirect', [UserController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/google/authenticateUser', [UserController::class, 'authenticateGoogleUser'])->name('google.authenticate');


/**
 * -------------------------------------------------------------------------------------------
 *
 *      Admin Routes
 *
 * ------------------------------------------------------------------------------------------
 */

Route::prefix('supadmin')->as('supadmin.')->group(function () {
    Route::inertia('/login', 'Admin/Auth/Login')->name('login');
    Route::post('login', [AdminController::class, 'login'])->name('login');

    Route::middleware('auth')->group(function () {
        Route::inertia('/', 'Admin/Home')->name('home');
    });
});
