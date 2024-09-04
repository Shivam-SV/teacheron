<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserQualification extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'name', 'started_at', 'ended_at', 'institute_name',
        'obtained_score', 'max_score'
    ];

    protected $appends = ['avg_percentage'];

    protected function casts(){
        return [
            'started_at' => 'date',
            'ended_at' => 'date'
        ];
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getAvgPercentageAttribute(){
        return number_format($this->obtained_score / $this->max_score * 100, 2);
    }
}
