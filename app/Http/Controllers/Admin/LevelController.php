<?php

namespace App\Http\Controllers\Admin;

use App\Grid\Grid;
use App\Grid\Column;
use App\Models\Level;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class LevelController extends Controller
{
    protected $model = Level::class;

    public function index(){
        if(!request()->inertia() && request()->expectsJson()){
            return $this->getQueryData();
        }

        return inertia('Admin/Level/Index', [
            'levels' => Grid::of($this->model)
                ->columns([
                    Column::make('name'),
                    Column::make('group_name'),
                    Column::make('tags')->transform(fn($row) => is_array($row->tags) ? implode(', ',$row->tags) : null),
                    Column::action('action')
                ])->render()
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|max:70|regex:/^[\w\-\s]+$/',
            'group_name' => 'required|max:50|regex:/^[\w\-\s]+$/',
            'tags' => 'nullable|array',
            'created_by_user_id' => 'required|exists:users,id'
        ]);

        try{
            $slug = Str::slug($request->name);
            $level = Level::create(array_merge($request->only('name', 'group_name', 'tags', 'created_by_user_id'), compact('slug')));
            Session::flash('success', "{$level->name} has been added to levels");
        }catch(\Throwable $th){
            Log::error("Fail to create the level due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while creating the level! Reverted the data back");
        }
    }

    public function update(Request $request, $levelId){
        $request->validate([
            'name' => 'required|max:70|regex:/^[\w\-\s]+$/',
            'group_name' => 'required|max:50|regex:/^[\w\-\s]+$/',
            'tags' => 'nullable|array',
            'created_by_user_id' => 'required|exists:users,id'
        ]);

        try{
            $level = Level::find($levelId)->update($request->only('name', 'group_name', 'tags', 'created_by_user_id'));
            Session::flash('success', "Level has been updated");
        }catch(\Throwable $th){
            Log::error("Fail to update (id: {$levelId}) the level due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the level! Reverted the data back");
        }
    }

    public function destroy($levelId){
        try{
            Level::findOrFail($levelId)?->delete();
            Session::flash('success', "Level has been removed");
        }catch(\Throwable $th){
            Log::error("Fail to delete the level (id: {$levelId}) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while removing the level! Reverted the data back");
        }
    }

       # Accessable outside from admin panel

       public function getLevels(Request $request){
        return $this->model::get();
    }
}
