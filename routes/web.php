<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\LevelController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\PostController;
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

Route::get('/profile/{userId?}', [UserController::class, 'Profile'])->name('profile');
Route::get('/profile/{userId?}/edit-basic', [UserController::class, 'EditProfile'])->name('profile.edit-basic');
Route::get('/new-post', [PostController::class, 'createPost'])->name('new-post');

# --------------
# Backend Routes
# --------------

# Authentication Routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::get('send-verification-email/{userId}', [UserController::class, 'sendVerificationEmail'])->name('send-verification-email');
Route::get('verify-email/{userId}', [UserController::class, 'verifyEmail'])->name('verify-email');

Route::post('/profile/{userId?}/update-basic', [UserController::class, 'UpdateBasicDetails'])->name('profile.update-basic');
Route::post('/profile/{userId?}/update-subjects', [UserController::class, 'UpdateSubjects'])->name('profile.update-subjects');
Route::post('/profile/{userId?}/add-phone-number', [UserController::class, 'AddPhoneNumber'])->name('profile.add-phone-number');
Route::post('/logout', [UserController::class, 'logout'])->name('logout');

# google auth routes
Route::get('/google/redirect', [UserController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/google/authenticateUser', [UserController::class, 'authenticateGoogleUser'])->name('google.authenticate');

# fetch Routes
Route::group(['prefix' => '/api-v1', 'as' => 'api.'], function(){
    Route::get('subjects', [SubjectController::class, 'getSubjects'])->name('subjects');
    Route::get('levels', [LevelController::class, 'getLevels'])->name('levels');
});

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

    Route::middleware('auth:admin')->group(function () {
        Route::inertia('/', 'Admin/Home')->name('home');

        // subject
        Route::resource('/subject', SubjectController::class, ['except' => ['create', 'edit']]);
        Route::resource('/level', LevelController::class, ['except' => ['create', 'edit']]);
    });
});
