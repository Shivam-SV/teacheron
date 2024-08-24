<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email',
        'phone',
        'address',
        'country_id',
        'verified_at',
    ];

    protected function casts(){
        return ['verified_at' => 'date'];
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
