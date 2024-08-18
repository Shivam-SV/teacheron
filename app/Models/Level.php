<?php

namespace App\Models;

use App\Enums\LevelExperties;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'group_name', 'tags', 'created_by_user_id'];

    protected function casts(){
        return [
            "tags" => 'array'
        ];
    }

    public function user(){
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function userSubjectsFrom(){
        return $this->hasMany(UserHaveSubject::class, 'level_from_id');
    }

    public function userSubjectsTo(){
        return $this->hasMany(UserHaveSubject::class, 'level_to_id');
    }

}
