<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPrice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'price',
        'updated_by'
    ];
}
