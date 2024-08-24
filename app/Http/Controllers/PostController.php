<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Level;
use App\Models\Subject;
use App\Models\Language;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\Country;
use App\Models\PostHaveSubjects;
use App\Models\PostPurpose;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class PostController extends Controller
{
    protected $model = Post::class;

    public function index(Request $request){
        return inertia('Post/Index', [
            'posts' => $this->model::with(['subjects', 'languagePreference','country'])->paginate(10)
        ]);
    }

    public function createPost(Request $request){
        $user = auth()->user();

        return Inertia::render('Post/Create', [
            "userPhoneNumbers" => $user->phoneNumbers,
            "countries" => Country::get(),
            "purposes" => PostPurpose::pluck('name', 'id'),
            "levels" => Level::pluck('name', 'id'),
            "subjects" => Subject::pluck('name', 'id'),
            "languages" => Language::pluck('name', 'id'),
        ]);
    }

    public function storePost(PostRequest $request){

        try{
            DB::beginTransaction();
            $user = auth()->user();
            # Create post and syncing relations
            $post = $this->model::create(
                $request->only(['title','user_phone_id','address', 'country_id', 'description', 'purpose_id', 'budget_currency_code', 'level_id', 'gender_preferance', 'min_budget', 'max_budget', 'created_by_user_id'])
            );
            $post->subjects()->sync($request->subjects_id);
            $post->languagePreference()->sync($request->language_preferrances_id);

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
