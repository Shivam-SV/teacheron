<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Traits\HasUserAuthentications;

class UserController extends Controller
{
    use HasUserAuthentications;

    protected $admin = false;

    public function Profile(?int $userId = null){
        $user = $userId ? User::find(base64_decode($userId)) : auth()->user();
        return Inertia::render('Auth/Profile', ['user' => $user]);
    }
}
