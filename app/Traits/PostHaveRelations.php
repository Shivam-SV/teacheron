<?php

namespace App\Traits;

use App\Models\User;
use App\Models\Level;
use App\Models\Country;
use App\Models\Subject;
use App\Models\Language;
use App\Models\PostPurpose;
use App\Models\UserContact;
use App\Models\PostActivity;
use App\Models\PostImpression;
use App\Models\PostSave;

trait PostHaveRelations{
    public function user(){
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function userPhone(){
        return $this->belongsTo(UserContact::class, 'user_phone_id');
    }

    public function subjects(){
        return $this->belongsToMany(Subject::class, 'post_have_subjects', 'post_id', 'subject_id');
    }

    public function level(){
        return $this->belongsTo(Level::class);
    }

    public function languagePreference(){
        return $this->belongsToMany(Language::class, 'post_have_language_preference', 'post_id', 'language_id');
    }

    public function purpose(){
        return $this->belongsTo(PostPurpose::class);
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function impressions(){
        return $this->hasMany(PostImpression::class);
    }

    public function activity(){
        return $this->hasMany(PostActivity::class);
    }

    public function saves(){
        return $this->hasMany(PostSave::class);
    }
}
