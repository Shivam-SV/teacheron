<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    public function index(){
        return Inertia::render('Tutors/Index', [
            'tutors' => User::teacher()->get()
        ]);
    }
}
