<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class UserHaveSubject extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'subject_id'];

    protected $with = ['levels', 'subject'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function levels(){
        return $this->belongsToMany(Level::class, 'user_subject_has_levels');
    }
}
