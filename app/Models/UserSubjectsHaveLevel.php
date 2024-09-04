<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSubjectsHaveLevel extends Model
{
    public function level(){
        return $this->belongsTo(Level::class);
    }

    public function userSubject(){
        return $this->belongsTo(UserHaveSubject::class);
    }
}
