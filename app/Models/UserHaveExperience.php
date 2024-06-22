<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserHaveExperience extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'organisation_name', 'organisation_type', 'designation', 'experience_in_years',
        'experience_in_months', 'description_about_role'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
