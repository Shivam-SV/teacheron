<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserQualification extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'name', 'started_at', 'ended_at', 'institute_name',
        'obtained_score', 'max_score'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
