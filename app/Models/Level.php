<?php

namespace App\Models;

use App\Enums\LevelExperties;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;

    protected $fillable = ['level_name', 'experties_as', 'created_by_user_id'];

    protected function casts(){
        return [
            "experties_as" => LevelExperties::class
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

    public static function GridColumns(){
        return [
            ["title" => 'Level', 'field' => 'level_name'],
            ["title" => 'Experties', 'field' => 'experties_as'],
        ];
    }

    public static function experties(){
        return LevelExperties::cases();
    }

}
