<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Level;
use App\Models\Subject;
use App\Models\Language;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class PostController extends Controller
{
    protected $model = Post::class;

    public function index(Request $request){
        dd($this->model::with('subjects')->get());
        return inertia('Post/Index', [
            'posts' => $this->model::paginate(10)
        ]);
    }

    public function createPost(Request $request){
        $user = auth()->user();
        return Inertia::render('Post/Create', [
            'phoneNumbers' => $user->alternate_phone,
            'subjects' => Subject::get(),
            'levels' => Level::get(),
            'purposes' => $this->model::purposes(),
            'languages' => Language::get()
        ]);
    }

    public function storePost(PostRequest $request){

        try{
            DB::beginTransaction();
            $user = auth()->user();
            $this->model::create(array_merge(
                $request->only(['title', 'description', 'contact', 'language_preferrance', 'gender_preferance', 'subjects', 'level_id', 'purpose', 'min_budget', 'max_budget']), [
                    'created_by_user_id' => $user->id,
                    'budget_currency_code' => $user->country?->code ?? config('defaults.currency_code')
                ]
            ));
            Session::flash('success', 'Your post has been created successfully');
            DB::commit();
            return to_route('home');
        }catch(\Exception $e){
            DB::rollBack();
            Log::error("Fail to create post (user_id: {$user->id}) due to: {$e->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while creating the post! Reverted the data back");
            return to_route('home');
        }
    }
}
