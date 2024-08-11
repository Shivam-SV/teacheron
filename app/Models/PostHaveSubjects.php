<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostHaveSubjects extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'subject_id',
    ];
}
