<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Level;
use App\Models\Subject;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $model = Post::class;

    public function createPost(Request $request){
        $user = auth()->user();
        return Inertia::render('Post/Create', [
            'phoneNumbers' => $user->alternate_phone,
            'subjects' => Subject::get(),
            'levels' => Level::get(),
            'purposes' => $this->model::purposes()
        ]);
    }
}
