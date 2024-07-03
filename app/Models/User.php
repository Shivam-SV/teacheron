<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Support\Arr;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'alternate_emails',
        'alternate_phone', 'languages_known', 'google_id',
        'email_verified_at', 'gender', 'date_of_birth', 'status',
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

    protected $with = ['profile'];

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

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_have_roles');
    }

    public function loginLogs()
    {
        return $this->hasMany(UserLoginLog::class);
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function profile(){
        return $this->hasOne(Media::class, 'model_id', 'id')->where('model_name', 'users')->where('model_column', 'profile');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'user_have_subjects')
            ->withPivot('level_from_id', 'level_to_id')
            ->using(UserHaveSubject::class)
            ->withTimestamps();
    }
}
