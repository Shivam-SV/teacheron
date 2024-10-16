<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Throwable;
use App\Grid\Grid;
use App\Grid\Column;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\PostActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    protected $model = Post::class;
    public function index()
    {
        return Inertia::render('Admin/Posts/Index', [
            'posts' => Grid::of($this->model)
                ->columns([
                    Column::make('title'),
                    Column::make('description')->transform(fn($row) => Str::limit($row->description, 100)),
                    Column::make('purpose_id')->label('Purpose')->transform(fn($row) => $row->purpose->name),
                    Column::make('level_id')->label('Level')->transform(fn($row) => $row->level->name),
                    Column::make('status'),
                    Column::action('action')
                    // Column::action('user'),
                ])->render()
        ]);
    }

    public function show($postId){
        return Inertia::render('Admin/Posts/View', [
            'post' => Post::with(['level', 'subjects', 'purpose', 'user', 'languagePreference'])->findOrFail(base64_decode($postId)),
            'postStatuses' => Post::getStatuses(),
            'postActivities' => PostActivity::with(['user'])->where('post_id', base64_decode($postId))->get()
        ]);
    }

    public function updateStatus(Request $request, string $postId){
        $request->validate([
            'status' => "required|string|in:".implode(',', array_column(Post::getStatuses(), 'value'))
        ]);
        try{
            DB::beginTransaction();

            $post = Post::findOrFail(base64_decode($postId));
            PostActivity::create(['post_id' => $post->id, 'user_id' => auth()->id(), 'column_name' => 'status', 'previous_value' => $post->status, 'updated_value' => $request->status]);
            $post->update($request->only('status'));

            DB::commit();
            return ['status' => true, 'message' => 'Post status updated successfully'];
        }catch(Throwable $e){
            Log::error("Error while updating post status: ".$e->getMessage());
            return ['status' => false, 'message' => 'Something been stuck while updating post status, Please try later'];
        }
    }

    public function updatePrice(Request $request, string $postId){
        $request->validate([
            'price' => "required|numeric|min:0"
        ]);
        try{
            DB::beginTransaction();

            $post = Post::findOrFail(base64_decode($postId));
            PostActivity::create(['post_id' => $post->id, 'user_id' => auth()->id(), 'column_name' => 'price', 'previous_value' => $post->price, 'updated_value' => $request->price]);
            $post->update(['price' => $request->price]);

            DB::commit();
            return ['status' => true, 'message' => 'Post price updated successfully'];
        }catch(Throwable $e){
            Log::error("Error while updating post price: ".$e->getMessage());
            return ['status' => false, 'message' => 'Something been stuck while updating post price, Please try later'];
        }
    }
}
