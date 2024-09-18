<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostPurchase extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'post_id', 'price', 'status', 'purchase_date'];

    public function post(){
        return $this->belongsTo(Post::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function transactions(){
        $this->hasMany(Transaction::class);
    }
}
