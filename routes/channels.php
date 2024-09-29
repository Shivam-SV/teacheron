<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('conversation.{conversationId}', function ($user, $conversationId) {
    $conversation = Conversation::findOrFail($conversationId);
    return (int) $user->id === (int) $conversation->teacher_id || (int) $user->id === (int) $conversation->student_id;
});
