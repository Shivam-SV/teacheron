<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TutorController extends Controller
{
    public function index(){
        return Inertia::render('Tutors/Index', [
            'tutors' => User::teacher()
            ->with(['userSubjects'])
            ->whereHas('userSubjects')
            ->whereHas('qualifications')
            ->whereHas('userExperience')
            ->whereHas('documents')
            ->paginate(10),
        ]);
    }

    public function view($tutorId){
        return Inertia::render('Tutors/View', ['tutor' => User::teacher()->with(['userContacts', 'userSubjects', 'qualifications', 'country'])->findOrFail(base64_decode($tutorId))]);
    }

    public function wishlistUser($tutorId){
        $user = User::findOrfail(base64_decode($tutorId));
        try{
            $user->addToWishlist();
            return response(['status' => true, 'message' => 'User Added to wishlist']);
        }catch(\Throwable $th){
            Log::error("Fail to wishlist the user (user_id: {$user->id}) due to: {$th->getMessage()}");
            return response(['status' => false, 'message' => 'Oops! we faced something wrong while wishlisting the user! Please try again later'], 500);
        }
    }

    public function unWishlistUser($tutorId){
        $user = User::findOrfail(base64_decode($tutorId));
        try{
            $user->removeFromWishlist();
            return response(['status' => true, 'message' => 'User removed from wishlist']);
        }catch(\Throwable $th){
            Log::error("Fail to unwishlist the user (user_id: {$user->id}) due to: {$th->getMessage()}");
            return response(['status' => false, 'message' => 'Oops! we faced something wrong while un-wishlisting the user! Please try again later'], 500);
        }
    }
}
