<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTutoringDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'duration_period', 'min_price', 'max_price', 'prive_varing_description',
        'total_experience', 'online_experience', 'offline_experience', 'can_travel',
        'travel_kms', 'can_teach_online', 'have_digital_pen', 'can_help_with_homework',
        'currently_working', 'looking_for_duration'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
