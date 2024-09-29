<?php

namespace App\Models;

use App\Enums\ConversationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'teacher_id', 'student_id', 'post_purchases_id', 'status'];

    protected function casts(){
        return [
            'status' => ConversationStatus::class
        ];
    }

    public function teacher(){
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function student(){
        return $this->belongsTo(User::class,'student_id');
    }

    public function postPurchases(){
        return $this->belongsTo(PostPurchase::class);
    }

    public function messages(){
        return $this->hasMany(Message::class);
    }

    public function getLastMessageAttribute(){
        return $this->messages()->latest()->first();
    }
}
