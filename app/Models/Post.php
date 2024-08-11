<?php

namespace App\Models;

use App\Enums\PostPurposes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'description', 'created_by_user_id', 'purpose', 'subject_id',
        'experties', 'level_id', 'gender_preference', 'status', 'min_budget',
        'max_budget', 'budget_currency_code'
    ];

    protected function casts(){
        return [
            'purpose' => PostPurposes::class
        ];
    }

    public function user(){
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function subject(){
        return $this->belongsTo(Subject::class);
    }

    public function level(){
        return $this->belongsTo(Level::class);
    }

    public static function purposes(){
        return PostPurposes::cases();
    }
}
