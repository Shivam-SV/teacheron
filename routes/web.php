<?php

use App\Http\Controllers\ConversationController;
use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\UserController;

# Authentication Routes
Route::inertia('/', 'Index')->name('home');
Route::inertia('/login', 'Auth/Login')->name('login');
Route::get('/sign-in', function () {
    return Inertia::render('Auth/Register', [
        'roles' => Role::whereNot('name', 'admin')->get()
    ]);
});
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::get('send-verification-email/{userId}', [UserController::class, 'sendVerificationEmail'])->name('send-verification-email');
Route::get('verify-email/{userId}', [UserController::class, 'verifyEmail'])->name('verify-email');
# on Boarding Routes
Route::get('/on-board/{step?}', [UserController::class, 'onBoarding'])->name('on-board');

Route::post('/logout', [UserController::class, 'logout'])->name('logout');
# google auth routes
Route::get('/google/redirect', [UserController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/google/authenticateUser', [UserController::class, 'authenticateGoogleUser'])->name('google.authenticate');


# Profile Routes
Route::group(['prefix' => 'profile','middleware' => 'auth'], function(){
    Route::get('/{userId?}', [UserController::class, 'Profile'])->name('profile');
    Route::get('/{userId?}/edit-basic', [UserController::class, 'EditProfile'])->name('profile.edit-basic');
    Route::post('/{userId?}/update-basic', [UserController::class, 'UpdateBasicDetails'])->name('profile.update-basic');
    Route::post('/{userId?}/add-phone-number', [UserController::class, 'AddPhoneNumber'])->name('profile.add-phone-number');
    Route::post('/{userId?}/send-otp-to-contact', [UserController::class, 'sendOtpToContact'])->name('profile.send-otp-to-contact');
    Route::post('/{userId?}/verify-otp-and-save-contact', [UserController::class, 'verifyOtpAndSaveContact'])->name('profile.verify-otp-and-save-contact');
    Route::post('/{userId?}/update/profile-picture', [UserController::class, 'UpdateProfilePic'])->name('profile.update-profile-picture');
    Route::post('/{userId?}/update/timeline-picture', [UserController::class, 'UpdateTimelinePic'])->name('profile.update-timeline-picture');
    
    Route::post('/{userId?}/update/subjects', [UserController::class, 'UpdateSubjects'])->name('profile.update-subjects');
    Route::post('/{userId?}/update/educations', [UserController::class, 'UpdateEducations'])->name('profile.update-educations');
    Route::post('/{userId?}/update/experience', [UserController::class, 'UpdateExperience'])->name('profile.update-experience');
    Route::post('/{userId?}/update/documents', [UserController::class, 'UpdateDocuments'])->name('profile.update-documents');
});

# Post Routes
Route::group(['middleware' => 'auth'], function(){
    Route::get('/new-post', [PostController::class, 'createPost'])->name('new-post');
    Route::post('/post/store', [PostController::class, 'storePost'])->name('post.store');
});
Route::get('/posts/{query?}', [PostController::class, 'index'])->name('posts');
Route::get('/post/{postId}', [PostController::class, 'viewPost'])->name('post.view');
Route::post('/post/{postId}/save', [PostController::class,'savePost'])->name('post.save');
Route::post('/post/{postId}/unsave', [PostController::class, 'unsavePost'])->name('post.unsave');
Route::post('/post/{postId}/buy', [PostController::class, 'buyPost'])->name('post.buy');

# Teachers Routes
Route::get('/tutors', [TutorController::class,'index'])->name('tutors');
Route::get('/tutor/{tutorId}', [TutorController::class, 'view'])->name('tutor');

# Conversations Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations');
    Route::get('/conversation/{conversationId}', [ConversationController::class, 'viewConversation'])->name('conversation.view');
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
    Route::post('login', [App\Http\Controllers\Admin\AdminController::class, 'login'])->name('login');

    Route::middleware('auth:admin')->group(function () {
        Route::inertia('/', 'Admin/Home')->name('home');
        Route::resource('/subject', App\Http\Controllers\Admin\SubjectController::class, ['except' => ['create', 'edit']]);
        Route::resource('/level', App\Http\Controllers\Admin\LevelController::class, ['except' => ['create', 'edit']]);
        Route::resource('/post-purpose', App\Http\Controllers\Admin\PostPurposesController::class, ['except' => ['create', 'edit']]);
        Route::resource('/teacher', App\Http\Controllers\Admin\TeacherController::class, ['except' => ['create', 'edit']]);
        Route::post('/teacher/{teacherId}/price/change', [App\Http\Controllers\Admin\TeacherController::class, 'changePrice'])->name('teacher.change-price');
        Route::post('/teacher/{teacherId}/document/verify', [App\Http\Controllers\Admin\TeacherController::class, 'verifyDocument'])->name('teacher.verify-document');
        Route::resource('/student', App\Http\Controllers\Admin\StudentController::class, ['except' => ['create', 'edit']]);
        Route::resource('/posts', App\Http\Controllers\Admin\PostController::class, ['except' => ['create', 'edit']]);
        Route::post('/post/{postId}/update-status', [App\Http\Controllers\Admin\PostController::class, 'updateStatus'])->name('posts.update-status');
        Route::post('/post/{postId}/update-price', [App\Http\Controllers\Admin\PostController::class, 'updatePrice'])->name('posts.update-price');

        // Teacher routes
        Route::post('teacher/fill-wallet', [App\Http\Controllers\Admin\TeacherController::class, 'fillWallet'])->name('teacher.fill-wallet');
    });
});


# fetch Routes
Route::group(['prefix' => '/api-v1', 'as' => 'api.'], function(){
    Route::get('subjects', [App\Http\Controllers\Admin\SubjectController::class, 'getSubjects'])->name('subjects');
    Route::get('levels', [App\Http\Controllers\Admin\LevelController::class, 'getLevels'])->name('levels');

    # Conversations Apis
    Route::get('conversations/{userId?}', [ConversationController::class, 'allConversations'])->name('conversations');
    Route::get('conversation/{conversationId}/messages', [ConversationController::class, 'loadMessages'])->name('conversation.load-messages');
    Route::post('conversations/{conversationId}/send-message', [ConversationController::class, 'sendMessage'])->name('conversation.send-message');
});
