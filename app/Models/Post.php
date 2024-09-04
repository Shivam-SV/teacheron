<?php

namespace App\Models;

use App\Enums\PostPurposes;
use Carbon\CarbonInterface;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory, SoftDeletes, \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

    protected $fillable = [
        'title', 'description','address','country_id', 'user_phone_id', 'created_by_user_id', 'purpose_id',
        'level_id', 'gender_preference', 'status', 'min_budget',
        'max_budget', 'budget_currency_code',
    ];

    protected $appends = ['budget', 'posted_since'];

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

    public function getBudgetAttribute(){
        return intval($this->min_budget) . " - " . intval($this->max_budget);
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function getPostedSinceAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans(now(), CarbonInterface::DIFF_RELATIVE_TO_NOW);
    }
}
