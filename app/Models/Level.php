<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;

    protected $fillable = ['level_name', 'experties_as', 'created_by_user_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function userSubjectsFrom()
    {
        return $this->hasMany(UserHaveSubject::class, 'level_from_id');
    }

    public function userSubjectsTo()
    {
        return $this->hasMany(UserHaveSubject::class, 'level_to_id');
    }
}
