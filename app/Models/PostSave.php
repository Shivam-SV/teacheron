<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostSave extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = ['post_id', 'user_id', 'saved_at'];

    protected function casts(){
        return ['saved_at' => 'datetime'];
    }

    public function post(){
        return $this->belongsTo(Post::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
