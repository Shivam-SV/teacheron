<?php

namespace App\Traits;

use App\Models\Post;
use App\Models\User;
use App\Models\Media;
use App\Models\Wallet;
use App\Models\Country;
use App\Models\UserContact;
use App\Models\PostPurchase;
use App\Models\UserLoginLog;
use App\Models\UserHaveSubject;
use App\Models\UserQualification;

trait UserHaveRelations{
    public function loginLogs(){
        return $this->hasMany(UserLoginLog::class);
    }

    public function verifiedBy(){
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function profile(){
        return $this->hasOne(Media::class, 'model_id', 'id')->where('model_name', 'users')->where('model_column', 'profile');
    }

    public function userSubjects(){
        return $this->hasMany(UserHaveSubject::class);
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function posts(){
        return $this->hasMany(Post::class, 'created_by_user_id');
    }

    public function userContacts(){
        return $this->hasMany(UserContact::class);
    }

    public function phoneNumbers(){
        return $this->userContacts()->whereNotNull('phone');
    }

    public function alternateEmails(){
        return $this->userContacts()->whereNotNull('email');
    }

    public function alternateAddresses(){
        return $this->userContacts()->whereNotNull('address');
    }

    public function qualifications(){
        return $this->hasMany(UserQualification::class);
    }

    public function wallet(){
        return $this->hasMany(Wallet::class);
    }

    public function postPurchased(){
        return $this->hasMany(PostPurchase::class);
    }

    public function conversation(){
        return $this->hasMany(Conversation::class, ['teacher_id', 'student_id']);
    }
}
