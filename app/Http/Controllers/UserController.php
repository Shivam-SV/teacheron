<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\DocumentType;
use Exception;
use App\Models\User;
use Inertia\Inertia;
use App\Models\UserContact;
use App\Models\UserDocument;
use App\Models\UserHaveExperience;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Models\UserHaveSubject;
use App\Models\UserQualification;
use App\Traits\InteractWithOtp;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Traits\HasUserAuthentications;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    use HasUserAuthentications, InteractWithOtp;

    protected $admin = false;

    public function Profile(?string $userId = null){
        $user = User::with(['userContacts', 'userSubjects', 'qualifications', 'country', 'userExperience', 'documents', 'posts'])->findOrFail($userId ? base64_decode($userId) : auth()->id());
        return Inertia::render('Auth/Profile', ['user' => $user, 'documentTypes' => DocumentType::all()]);
    }

    public function EditProfile(?string $userId = null){
        $user = $userId ? User::with(['userContacts'])->find(base64_decode($userId)) : auth()->user();
        $countries = Country::get();
        return Inertia::render('Auth/EditBasicProfile', compact('user', 'countries'));
    }

    public function UpdateBasicDetails(Request $request,?string $userId = null){
        $user = $userId ? User::find(base64_decode($userId)) : auth()->user();
        $request->validate([
            'name' => 'required|string|max:50|regex:/^[\w\-\s]+$/',
            'email' => ["required", 'email', Rule::unique('users')->ignore($user->id)],
            'date_of_birth' => 'nullable|date|date_format:Y-m-d',
            'gender' => "required|in:male,female,not specified",
            'bio' => 'nullable|string|min:200|max:1000',
            'address' => 'nullable|string',
            'country_id' => 'required|exists:countries,id',
            'alternate_emails' => 'nullable',
            'alternate_phone' => 'nullable',
        ]);

        try{
            $alternateEmails = !empty($request->alternate_emails) ? (is_array($request->alternate_emails) ? $request->alternate_emails : array_map('trim',explode(',',$request->alternate_emails))) : [];
            $alternatePhones = !empty($request->alternate_phone) ? (is_array($request->alternate_phone) ? $request->alternate_phone : array_map('trim',explode(',',$request->alternate_phone))) : [];
            $user->update(array_merge($request->only('name', 'email', 'date_of_birth', 'gender', 'address', 'bio', 'country_id'), ['alternate_emails' => $alternateEmails,'alternate_phone' => $alternatePhones]));
            Session::flash('success', 'Profile Updated');
        }catch(\Throwable $th){
            Log::error("Fail to update basic user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the profile! Reverted the data back");
        }
    }

    public function UpdateSubjects(Request $request, $userId){
        $request->validate([
            'userSubjects.*.subject_id' => 'required|numeric|distinct|exists:subjects,id',
            'userSubjects.*.levels_id' => 'required|array',
            'userSubjects.*.levels_id.*' => 'required|numeric|distinct|exists:levels,id'
        ]);

        try{
            DB::beginTransaction();
            $user = User::with('userSubjects')->find(base64_decode($userId));
            # Removing the removed subjects
            $deletableRows = array_intersect(array_column($request->userSubjects, 'subject_id'), $user->userSubjects->select('subject_id')->toArray());
            if(!empty($deletableRows)) UserHaveSubject::whereIn('subject_id', $deletableRows)->where('user_id', $user->id)->delete();

            # Store the updated subjects
            foreach($request->userSubjects as $index => $userSubject){
                UserHaveSubject::updateOrCreate(['user_id' => $user->id, 'subject_id' => $userSubject['subject_id']])->levels()->sync(array_map(fn($l) => ['level_id' => $l],$userSubject['levels_id']));
            }
            Session::flash('success', 'Profile Updated');
            DB::commit();
            return to_route('profile');
        }catch(\Throwable $th){
            Log::error("Fail to update subjects user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the profile! Reverted the data back");
        }
    }

    public function UpdateEducations(Request $request, $userId){
        $request->validate([
            'education.*.name' => 'required|string|max:50',
            'education.*.institute_name' => 'required|string|max:50',
            'education.*.started_at' => 'required|date|date_format:Y-m',
            'education.*.ended_at' => 'required|date|date_format:Y-m',
            'education.*.obtained_score' => 'required|numeric|lt:education.*.max_score',
            'education.*.max_score' => 'required|numeric|gt:education.*.obtained_score',
            'education.*.user_id' => 'required|numeric|exists:users,id',
            'education.*.id' => 'nullable|numeric|exists:user_qualifications,id',
        ]);

        try{
            DB::beginTransaction();
            $user = User::find(base64_decode($userId));

            foreach($request->education as $education) UserQualification::updateOrCreate(Arr::only($education, ['user_id', 'id']), $education);
            Session::flash('success', 'Profile Updated');
            DB::commit();
        }catch(\Throwable $th){
            Log::error("Fail to update education user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the profile! Reverted the data back");
        }
    }

    public function UpdateExperience(Request $request, $userId){
        $request->validate([
            'experience.*.organisation_name' => 'required|string|max:100',
            'experience.*.organisation_type' => 'required|string|max:100',
            'experience.*.designation' => 'required|string|max:100',
            'experience.*.started_at' => 'required|date|date_format:Y-m',
            'experience.*.ended_at' => 'nullable|date|date_format:Y-m',
            'experience.*.description' => 'nullable|string|max:1000',
            'experience.*.user_id' => 'required|numeric|exists:users,id',
            'experience.*.id' => 'nullable|numeric|exists:user_have_experiences,id',
        ]);

        try{
            DB::beginTransaction();
            $user = User::find(base64_decode($userId));
            foreach($request->experience as $experience) UserHaveExperience::updateOrCreate(Arr::only($experience, ['user_id', 'id', 'organization_name']), $experience);
            Session::flash('success', 'Profile Updated');
            DB::commit();
        }catch(\Throwable $th){
            Log::error("Fail to update experience user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the profile! Reverted the data back");
        }
    }

    public function AddPhoneNumber(Request $request, $userId){
        $request->validate([
            'phone' => 'required|max:999999999999|numeric'
        ]);

        try{
            $user = User::findOrFail(base64_decode($userId));
            UserContact::create(['user_id' => $user->id, 'phone' => $request->phone]);
            Session::flash('success', 'Phone number added');
        }catch(\Throwable $th){
            Log::error("Fail to add new phone number in user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while adding the phone number! Reverted the data back");
        }
    }

    public function sendOtpToContact(Request $request){
        $request->validate([
            'type' => 'required|in:phone,email',
            'value' => array_merge(['required'], $request->type == 'phone' ? ['integer', 'max:999999999999'] : ['email'])
        ]);
        try{
            $otp = $this->generateOtp("for-{$request->type}:{$request->value}");
            if($request->type == 'email') $this->sendOtpViaEmail($otp);
            else $this->sendOtpViaSMS($otp);

            return ['status' => true, 'message' => "A OTP has been sent to your {$request->type}"];
        }catch(\Throwable $th){
            Log::error("Fail to send OTP to the user via {$request->type} due to: {$th->getMessage()}");
            return ['status' => false, 'message' => 'Something went wrong while sending the OTP, please try again later'];
        }
    }

    public function verifyOtpAndSaveContact(Request $request, $userId){
        $this->setCachePostFix("for-{$request->type}:{$request->value}");
        $request->validate([
            'type' => 'required|in:phone,email',
            'value' => array_merge(['required'], $request->type == 'phone' ? ['integer', 'max:999999999999'] : ['email']),
            'otp' => ['required', 'max:999999', 'min:000000', "in:{$this->getOtp()}"]
        ]);

        try{
            $user = User::findOrFail(base64_decode($userId));
            if($this->hasOtpExists() && $this->matchOtp($request->otp)){
                UserContact::create(['user_id' => $user->id, $request->type => $request->value, 'verified_at' => now()]);
                Session::flash('success', "{$request->type} has been added");
            }else{
                throw new Exception('OTP has been expired or not matched');
            }
        }catch(\Throwable $th){
            Log::error("Fail to add new contact number in user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "OTP doesn't matches or expired, please try again later");
        }
    }

    public function UpdateDocuments(Request $request, $userId){
        $user = User::findOrFail(base64_decode($userId));
        $request->validate([
            'document.*.document_type_id' => 'required|numeric|exists:document_types,id',
            'document.*.document_files' => 'required|array',
            'document.*.document_files.*' => 'required|file|mimes:jpeg,png,jpg,pdf|max:5120',
        ], [
            'attributes' => [
                'document.*.document_type_id' => 'Document Type',
                'document.*.document_files.*' => 'Document Files',
            ]
        ]);

        try{
            foreach($request->document as $document){
                $UserDocument = UserDocument::updateOrCreate(['user_id' => $user->id, 'document_type_id' => $document['document_type_id']]);
                foreach($document['document_files'] as $file){
                    $UserDocument->attachMedia($file, UserDocument::DOCUMENT_FILES);
                }
            }

            Session::flash('success', 'Your documents has been uploaded, wait for our team to review it and approve it');
        }catch(\Throwable $th){
            Log::error("Fail to update documents user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the documents! Reverted the data back");
        }
    }

    public function UpdateProfilePic(Request $request, $userId){
        $user = User::findOrFail(base64_decode($userId));
        $request->validate([
            'profile' => 'required|file|mimes:jpeg,png,jpg|max:5120|dimensions:max_width=1000,max_height=1000, min_width=50,min_height=50,ratio=1/1'
        ]);

        try{
            $user->updateMedia($request->profile, User::PROFILE, $user->profile ? $user->profile->id : null);
            Session::flash('success', 'Profile picture has been updated');
        }catch(\Throwable $th){
            Log::error("Fail to update profile picture user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the profile picture! Reverted the data back");
        }
    }

    public function UpdateTimelinePic(Request $request, $userId){
        $user = User::findOrFail(base64_decode($userId));
        $request->validate([
            'timeline' => 'required|file|mimes:jpeg,png,jpg|max:8192|dimensions:max_width=1500,max_height=300,min_width=250,min_height=50,ratio=5/1'
        ]);

        try{
            $user->updateMedia($request->timeline, User::PROFILE, $user->timeline ? $user->timeline->id : null);
            Session::flash('success', 'Timeline picture has been updated');
        }catch(\Throwable $th){
            Log::error("Fail to update timeline picture user profile (user_id: $user->id) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the timeline picture! Reverted the data back");
        }
    }
}
