<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\Post;
use Inertia\Inertia;
use App\Models\Level;
use App\Models\Country;
use App\Models\Subject;
use App\Models\Language;
use App\Models\PostPurpose;
use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Models\PostHaveSubjects;
use App\Http\Requests\PostRequest;
use App\Models\PostPurchase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class PostController extends Controller
{
    protected $model = Post::class;

    public function index(Request $request){
        return inertia('Post/Index', [
            'posts' => $this->model::with(['subjects', 'languagePreference','country', 'saves' => fn($query) => $query->where('user_id', auth()->id())])->paginate(10)
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

    public function viewPost($postId){
        return Inertia::render('Post/View', ['post' => Post::with(['level', 'subjects', 'purpose', 'user', 'languagePreference'])->findOrFail(base64_decode($postId))]);
    }

    public function savePost($postId){
        try{
            $post = Post::findOrfail(base64_decode($postId));
            $post->savePost();
            return response(['status' => true, 'message' => 'Post saved for later']);
        }catch(Throwable $th){
            Log::error("Fail to save the post (post_id: {$post->id}) due to: {$th->getMessage()}");
            return response(['status' => false, 'message' => 'Oops! we faced something wrong while saving the post! Please try again later'], 500);
        }
    }

    public function unsavePost($postId){
        try{
            $post = Post::findOrfail(base64_decode($postId));
            $post->unsavePost();
            return response(['status' => true, 'message' => 'Post removed from saved posts']);
        }catch(Throwable $th){
            Log::error("Fail to unsave the post (post_id: {$post->id}) due to: {$th->getMessage()}");
            return response(['status' => false, 'message' => 'Oops! we faced something wrong while unsaving the post! Please try again later'], 500);
        }
    }

    public function buyPost($postId){
        try{
            DB::beginTransaction();
            $post = Post::findOrfail(base64_decode($postId));
            $user = auth()->user();
            if($user->wallet_balance < $post->price) return response(['status' => false, 'message' => 'You do not have enough balance to buy this post'], 500);

            # Debiting user wallet
            $user->debitCoins($post->price);

            # Adding post to user's purchased posts
            $postPurchase = PostPurchase::create(['post_id' => $post->id, 'user_id' => $user->id, 'price' => $post->price, 'purchase_date' => now()]);

            # creatting a new conversational thread for this post
            $conversation = Conversation::create([
                'name' => $post->title,
                'teacher_id' => $user->id,
                'student_id' => $post->created_by_user_id,
                'post_purchase_id' => $postPurchase->id,
            ]);

            DB::commit();
            return response(['status' => true, 'message' => 'Post bought successfully', 'conversation_id' => $conversation->id]);
        }catch(Throwable $th){
            Log::error("Fail to buy the post (post_id: {$post->id}) due to: {$th->getMessage()} - trace: {$th}");
            return response(['status' => false, 'message' => 'Oops! Something stuck while buying the post! Please try again later'], 500);
        }
    }
}
