<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleHavePermission extends Model
{
    use HasFactory;

    protected $fillable = ['role_id', 'permission_id'];
}
