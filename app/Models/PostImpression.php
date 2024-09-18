<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostImpression extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = ['post_id', 'user_id', 'last_viewed_at'];

    protected function casts(){
        return ['viewed_at' => 'datetime'];
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
