<?php

namespace App\Http\Controllers\Admin;

use App\Models\Level;
use App\Traits\HaveGrid;
use Illuminate\Http\Request;
use App\Enums\LevelExperties;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class LevelController extends Controller
{
    use HaveGrid;
    protected $model = Level::class;

    public function index(){
        if(!request()->inertia() && request()->expectsJson()){
            return $this->getQueryData();
        }

        return inertia('Admin/Level/Index', [
            'columns' => $this->getColumns(),
            'experties' => $this->model::experties(),
            ... $this->defaultViewData()
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'level_name' => 'required|max:70|regex:/^[\w\-\s]+$/',
            'experties_as' => 'required|in:'.implode(',', array_column($this->model::experties(), 'value')),
            'created_by_user_id' => 'required|exists:users,id'
        ]);

        try{
            $level = Level::create($request->only('level_name', 'experties_as', 'created_by_user_id'));
            Session::flash('success', "{$level->level_name} has been added to levels");
        }catch(\Throwable $th){
            Log::error("Fail to create the level due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while creating the level! Reverted the data back");
        }
    }

    public function update(Request $request, $levelId){
        $request->validate([
            'level_name' => 'required|max:70|regex:/^[\w\-\s]+$/',
            'experties_as' => 'required|in:'.implode(',', array_column($this->model::experties(), 'value')),
        ]);

        try{
            Level::find($levelId)->update($request->only('level_name', 'experties_as'));
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
