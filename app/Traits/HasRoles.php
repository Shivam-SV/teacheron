<?php

namespace App\Traits;

use App\Models\Role;

trait HasRoles{

    public function roles(){
        return $this->belongsToMany(Role::class, 'user_have_roles');
    }

    public function is($roleName){
        return $this->roles->where('name', 'LIKE', $roleName)->isNotEmpty();
    }
}
