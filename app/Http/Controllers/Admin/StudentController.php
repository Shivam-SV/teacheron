<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Traits\HaveGrid;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StudentController extends Controller{
    use HaveGrid;

    protected $model = User::class;

    public function index(){
        if(!request()->inertia() && request()->expectsJson()){
            return $this->getQueryData(fn($query) => $query->where('role_id', 1));
        }

        return Inertia::render('Admin/Student/Index', [
            ... $this->defaultViewData()
        ]);
    }
}
