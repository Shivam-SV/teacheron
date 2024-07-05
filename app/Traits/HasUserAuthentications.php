<?php

namespace App\Traits;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Media;
use Illuminate\Support\Str;
use App\Models\UserHaveRole;
use App\Models\UserLoginLog;
use Illuminate\Http\Request;
use App\Mail\VerifyUserEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

trait HasUserAuthentications{

    # Logs in User locally
    public function login(Request $request): null|\Illuminate\Http\RedirectResponse{
        # Validating Request
        $request->validate(array_merge(
            ['email' => 'required|email|exists:users,email','password' => 'required|min:7'],
            $this->admin ? ['role' => 'in:admin'] : []
        ));

        if($this->admin && (($user = User::where('email', $request->email)->first()) && !$user->is('admin'))){
            Session::flash('warning', 'Sorry! Your are not a admin');
            return back();
        }

        # Authenticating and logging if authenticated
        if(Auth::attempt($request->only('email', 'password'))){
            UserLoginLog::create([
                'user_id' => auth()->id(),
                'login_at' => now(),
                'device_IP' => $request->ip(),
                'system_info' => $_SERVER['HTTP_USER_AGENT']
            ]);

            return $this->admin ? to_route('supadmin.home') : to_route('home');
        }

        # Sending error message
        Session::flash('error', 'These credentials do not match with our records, please verify the credentials');
    }

    /**
     * It redirects the system to the google Oauth API
     * and shows the google authentication screen
     */
    public function redirectToGoogle(){
        return Socialite::driver('google')->redirect();
    }

    /**
     * After the authentication it hits the google for the user data,
     * Register the user if he/she is new for us
     * and logs him in
     */
    public function authenticateGoogleUser(Request $request){
        # getting google's user data
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = User::where('email', $googleUser->email)->first();
        # storing the user if not registered
        if(!$user){
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
            ]);
            if($googleUser->avatar){
                Media::create([
                    'model_id' => $user->id,
                    'model_name' => (new User)->getTable(),
                    'model_column' => 'profile',
                    'file_path' => $googleUser->avatar,
                    'file_name' => Str::snake($googleUser->name) .'Profile',
                    'source' => 'web'
                ]);
            }
        }
        # logging in and recording a log
        Auth::login($user);

        UserLoginLog::create([
            'user_id' => $user->id,
            'login_at' => now(),
            'device_IP' => $request->ip(),
            'system_info' => $_SERVER['HTTP_USER_AGENT']
        ]);

        return to_route('home');
    }

    # register a new user
    public function register(Request $request){
        # validating the user request
        $request->validate([
            'name' => 'required|string|max:70',
            'email' => 'required|email|unique:users,email|max:100',
            'password' => 'required|min:7|max:20|string',
            'role' => 'required|exists:roles,id|numeric'
        ]);

        # Storing User and adding a role for him
        DB::beginTransaction();
        $user = User::create($request->only('email', 'password', 'name'));
        UserHaveRole::create(['user_id' => $user->id, 'role_id' => $request->role]);
        DB::commit();

        Session()->flash('success', 'Register Successfully');
        return to_route('send-verification-email', ['userId' => encrypt($user->id)]);
    }

    # sending a verification email to the newly register user
    public function sendVerificationEmail($userId){
        $user = User::findOrFail(decrypt($userId));

        # if already verified redirect him to login page
        if($user->email_verified_at != null){
            Session()->flash('info', 'Email Already verified');
            return to_route('login');
        }

        Mail::to($user)->send(new VerifyUserEmail($user));
        return Inertia::render('Auth/VerifyEmail');
    }

    # verifying the users email
    public function verifyEmail($userId){
        $user = User::findOrFail(decrypt($userId));

        # if already verified then show a message about it.
        if($user->email_verified_at != null) session()->flash('info', 'Email Already verified');
        else {
            $user->update(['email_verified_at' => now()]);
            session()->flash('success', 'Email has been verified');
        }

        return to_route('login');
    }

    public function logout(){
        auth()->logout();
        to_route('home');
    }
}
