<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'meta'];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_have_permissions');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_have_roles');
    }
}
