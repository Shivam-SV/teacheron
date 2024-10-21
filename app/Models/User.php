<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory,
        \Illuminate\Notifications\Notifiable,
        \App\Traits\HasRoles,
        \App\Traits\HasWallet,
        \App\Traits\UserHaveRelations,
        \App\Traits\UserCustomMutations,
        \Awobaz\Compoships\Compoships;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email',  'password', 'bio', 'address', 'country_id',
        'google_id', 'email_verified_at', 'gender', 'date_of_birth', 'status',
        'status_updated_at', 'verified_at', 'verified_by', 'have_password',
        'user_login_type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with = ['profile', 'roles'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'alternate_emails' => 'array',
            'alternate_phone' => 'array',
            'languages_known' => 'array',
            'status_updated_at' => 'datetime',
            'verified_at' => 'datetime',
            'date_of_birth' => 'date'
        ];
    }

    protected $appends = ['wallet_balance', 'price'];

    public function getPriceAttribute(){
        return $this->userPrice()->price ?? 0;
    }

    # role scopes
    public function scopeTeacher(){
        return $this->whereHas('roles', fn($query) => $query->where('name', 'teacher'));
    }
    public function scopeStudent(){
        return $this->whereHas('roles', fn($query) => $query->where('name', 'student'));
    }
    public function scopeAdmin(){
        return $this->whereHas('roles', fn($query) => $query->where('name', 'admin'));
    }
}
