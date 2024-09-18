<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\TransactionType;
use App\Traits\HasRoles;
use Illuminate\Support\Arr;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

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

    protected $appends = ['wallet_balance'];

    public function loginLogs(){
        return $this->hasMany(UserLoginLog::class);
    }

    public function verifiedBy(){
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function profile(){
        return $this->hasOne(Media::class, 'model_id', 'id')->where('model_name', 'users')->where('model_column', 'profile');
    }

    public function userSubjects(){
        return $this->hasMany(UserHaveSubject::class);
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function posts(){
        return $this->hasMany(Post::class, 'created_by_user_id');
    }

    public function userContacts(){
        return $this->hasMany(UserContact::class);
    }

    public function phoneNumbers(){
        return $this->userContacts()->whereNotNull('phone');
    }

    public function alternateEmails(){
        return $this->userContacts()->whereNotNull('email');
    }

    public function alternateAddresses(){
        return $this->userContacts()->whereNotNull('address');
    }

    public function qualifications(){
        return $this->hasMany(UserQualification::class);
    }

    public function wallet(){
        return $this->hasMany(Wallet::class);
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

    # custom attrs
    public function getWalletbalanceAttribute(){
        return $this->wallet()->where('transaction_type', TransactionType::CREDIT)->sum('amount') - $this->wallet()->where('transaction_type', TransactionType::DEBIT)->sum('amount');
    }
}
