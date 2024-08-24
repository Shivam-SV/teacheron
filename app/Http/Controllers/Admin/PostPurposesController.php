<?php

namespace App\Http\Controllers\Admin;

use App\Grid\Grid;
use App\Grid\Column;
use App\Models\PostPurpose;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class PostPurposesController extends Controller
{
    protected $model = PostPurpose::class;

    public function index(){
        return inertia('Admin/PostPurpose/Index', [
            'postPurposes' => Grid::of($this->model)
                ->columns([
                    Column::make('name'),
                    Column::make('description'),
                    Column::action('action')
                ])->render()
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|max:70|regex:/^[\w\-\s]+$/',
            'description' => 'required|max:500',
        ]);

        try{
            $slug = Str::slug($request->name);
            $postPurpose = $this->model::create(array_merge($request->only('name', 'description'), compact('slug')));
            Session::flash('success', "{$postPurpose->name} has been added to post purposes");
        }catch(\Throwable $th){
            Log::error("Fail to create the post purpose due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while creating the post purpose! Reverted the data back");
        }
    }

    public function update(Request $request, $levelId){
        $request->validate([
            'id' => 'required|exists:post_purposes,id',
            'name' => 'required|max:70|regex:/^[\w\-\s]+$/',
            'description' => 'required|max:500',
        ]);

        try{
            $level = $this->model::find($levelId)->update($request->only('name', 'description'));
            Session::flash('success', "Post purpose has been updated");
        }catch(\Throwable $th){
            Log::error("Fail to update (id: {$levelId}) the post purpose due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the post purpose! Reverted the data back");
        }
    }

    public function destroy($postPurposeId){
        try{
            $this->model::findOrFail($postPurposeId)?->delete();
            Session::flash('success', "Post purpose has been removed");
        }catch(\Throwable $th){
            Log::error("Fail to delete the post purpose (id: {$postPurposeId}) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while removing the post purpose! Reverted the data back");
        }
    }
}
