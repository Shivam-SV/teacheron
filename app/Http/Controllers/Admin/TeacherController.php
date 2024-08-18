<?php

namespace App\Http\Controllers\Admin;

use App\Grid\Grid;
use App\Grid\Column;
use App\Models\User;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class TeacherController extends Controller{
    protected $model = User::class;

    public function index(){
        return Inertia::render('Admin/Teacher/Index', [
            'teachers' => Grid::of($this->model::whereHas('roles', fn($query) => $query->where('name', 'teacher')))
                ->columns([
                    Column::make('name', 'Name'),
                    Column::make('email', 'Email'),
                ])->render()
        ]);
    }
}
