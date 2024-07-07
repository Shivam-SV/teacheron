<?php

namespace App\Http\Controllers\Admin;

use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class SubjectController extends Controller{

    public function index(){
        if(!request()->inertia() && request()->expectsJson()){
            return Subject::get();
        }

        return inertia('Admin/Subject/Index', [
            'columns' => Subject::GridColumns()
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|max:50|regex:/^[\w\-\s]+$/',
            'meta' => 'nullable|max:255',
            'created_by_user_id' => 'required'
        ]);

        try{
            $subject = Subject::create($request->only('name', 'meta', 'created_by_user_id'));
            Session::flash('success', "{$subject->name} has been added to subjects");
        }catch(\Throwable $th){
            Log::error("Fail to create the subject due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while creating the subject! Reverted the data back");
        }
    }

    public function update($subjectId, Request $request){
        $request->validate([
            'name' => 'required|max:50|regex:/^[\w\-\s]+$/',
            'meta' => 'nullable|max:255',
        ]);

        try{
            $subject = (Subject::find($subjectId))->update($request->only('name', 'meta'));
            Session::flash('success', "Subject has been updated");
        }catch(\Throwable $th){
            Log::error("Fail to create the subject (id: {$subjectId}) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the subject! Reverted the data back");
        }
    }

    public function delete($subjectId){
        try{
            Subject::findOrFail($subjectId)?->delete();
            Session::flash('success', "Subject has been removed");
        }catch(\Throwable $th){
            Log::error("Fail to delete the subject (id: {$subjectId}) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the subject! Reverted the data back");
        }
    }
}