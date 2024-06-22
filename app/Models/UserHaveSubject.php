<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserHaveSubject extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'subject_id', 'level_from_id', 'level_to_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function levelFrom()
    {
        return $this->belongsTo(Level::class, 'level_from_id');
    }

    public function levelTo()
    {
        return $this->belongsTo(Level::class, 'level_to_id');
    }
}
