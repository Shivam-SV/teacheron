<?php

namespace App\Models;

use App\Enums\PostPurposes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes, \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

    protected $fillable = [
        'title', 'description','address','country_id', 'user_phone_id', 'created_by_user_id', 'purpose_id',
        'level_id', 'gender_preference', 'status', 'min_budget',
        'max_budget', 'budget_currency_code',
    ];

    protected $appends = ['price'];

    protected function casts(){
        return [
            'purpose' => PostPurposes::class,
        ];
    }

    public function user(){
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function userPhone(){
        return $this->belongsTo(UserContact::class, 'user_phone_id');
    }

    public function subjects(){
        return $this->belongsToMany(Subject::class, PostHaveSubject::class, 'post_id', 'subject_id');
    }

    public function level(){
        return $this->belongsTo(Level::class);
    }

    public function languagePreference(){
        return $this->belongsToMany(Language::class, PostHaveLanguagePreference::class, 'post_id', 'language_id');
    }

    public function purpose(){
        return $this->belongsTo(PostPurpose::class);
    }

    public function getPriceAttribute(){
        return "{$this->min_budget} - {$this->max_budget}";
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }
}
