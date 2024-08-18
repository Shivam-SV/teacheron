<?php

namespace App\Http\Controllers\Admin;

use App\Grid\Grid;
use App\Grid\Column;
use App\Models\User;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class StudentController extends Controller{

    protected $model = User::class;

    public function index(){
        return Inertia::render('Admin/Student/Index', [
            'students' => Grid::of($this->model::whereHas('roles', fn($query) => $query->where('name', 'teacher')))
                ->columns([
                    Column::make('name', 'Name'),
                    Column::make('email', 'Email'),
                ])->render()
        ]);
    }
}
