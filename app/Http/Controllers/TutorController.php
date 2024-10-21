<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    public function index(){
        return Inertia::render('Tutors/Index', [
            'tutors' => User::teacher()->with(['userSubjects'])->get()
        ]);
    }

    public function view($tutorId){
        return Inertia::render('Tutors/View', ['tutor' => User::teacher()->with(['userContacts', 'userSubjects', 'qualifications', 'country'])->findOrFail(base64_decode($tutorId))]);
    }

    public function wishlistUser(Request $request, $tutorId){

    }
}
