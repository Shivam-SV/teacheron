<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserDocumentStatus;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory,
        \Illuminate\Notifications\Notifiable,
        \App\Traits\HasRoles,
        \App\Traits\HasWallet,
        \App\Traits\UserHaveRelations,
        \App\Traits\UserCustomMutations,
        \App\Traits\HasMedia,
        \Awobaz\Compoships\Compoships;

    public const PROFILE = 'profile';
    public const TIMELINE = 'timeline';
    
    protected $medias = [Self::PROFILE, Self::TIMELINE];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email',  'password', 'bio', 'address', 'country_id',
        'google_id', 'email_verified_at', 'gender', 'date_of_birth', 'status',
        'status_updated_at', 'verified_at', 'verified_by', 'have_password',
        'user_login_type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with = ['profile', 'roles'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'alternate_emails' => 'array',
            'alternate_phone' => 'array',
            'languages_known' => 'array',
            'status_updated_at' => 'datetime',
            'verified_at' => 'datetime',
            'date_of_birth' => 'date'
        ];
    }

    protected $appends = ['wallet_balance', 'price', 'profile_completed_score'];

    public function getPriceAttribute(){
        return $this->userPrice->price ?? 0;
    }

    public function getProfileCompletedScoreAttribute(){
        /**
         * Profile score matters on the following factors:
         * 1. Education Qualification,
         * 2. Experience,
         * 3. Subjects taught,
         * 4. Documents uploaded,
         * 5. Documents verified,
         * 6. Profile picture & Cover picture uploaded,
         */

        $weights = [
            'education' => 20,
            'experience' => 20,
            'subjects' => 20,
            'documents_uploaded' => 10,
            'documents_verified' => 10,
            'profile_picture' => 10,
            'timeline' => 10,
        ];

        $score = 0;

        if(!$this->qualifications->isEmpty()) $score += $weights['education'];
        if(!$this->userExperience->isEmpty()) $score += $weights['experience'];
        if(!$this->userSubjects->isEmpty()) $score += $weights['subjects'];
        if(!$this->documents->isEmpty()) $score += $weights['documents_uploaded'];
        if($this->documents->where('status', UserDocumentStatus::VERIFIED)->count() == $this->documents->count()) $score += $weights['documents_verified'];
        if($this?->profile?->mediaLink || false) $score += $weights['profile_picture'];
        if($this?->timeline?->mediaLink || false) $score += $weights['timeline'];

        return $score;

    }

    # role scopes
    public function scopeTeacher(){
        return $this->whereHas('roles', fn($query) => $query->where('name', 'teacher'));
    }
    public function scopeStudent(){
        return $this->whereHas('roles', fn($query) => $query->where('name', 'student'));
    }
    public function scopeAdmin(){
        return $this->whereHas('roles', fn($query) => $query->where('name', 'admin'));
    }
}
