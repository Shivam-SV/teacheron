<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLoginLog extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'login_at', 'device_IP', 'system_info'];

    protected function casts(){
        return [
            'login_at' => 'datetime',
        ];
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
