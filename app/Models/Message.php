<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['conversation_id', 'sender_id', 'message'];

    protected $appends = ['messaged_ago'];

    public function sender(){
        return $this->belongsTo(User::class,'sender_id');
    }

    public function conversation(){
        return $this->belongsTo(Conversation::class, 'conversation_id');
    }

    public function getMessagedAgoAttribute(){
        return $this->created_at->diffForHumans();
    }
}
