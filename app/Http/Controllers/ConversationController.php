<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function index(){
        return Inertia::render('Conversations/Index');
    }

    public function viewConversation($conversationId){
        $conversation = Conversation::with(['teacher', 'student'])->findOrFail(base64_decode($conversationId));
        return Inertia::render('Conversations/View', compact('conversation'));
    }

    public function sendMessage($conversationId, Request $request){
        try{
            $request->validate(['message' => 'required|string|max:100000|min:1', 'sender_id' => 'required|integer|exists:users,id']);
            $conversation = Conversation::findOrFail(base64_decode($conversationId));
            $message = $conversation->messages()->create([
                'message' => $request->message,
                'sender_id' => auth()->id()
            ]);
            broadcast(new MessageEvent($message));
            return response(['status' => true,'message' => 'Message sent successfully', 'display' => false], 200);
        }catch(ValidationException $e){
            return response((['status' => false, 'display' => true] + $e->errors()), 500);
        }catch(\Exception $e){
            Log::error($e);
            return response(['status' => false,'message' => 'Something gonna wrong while sending message, please try again later', 'display' => true], 500);
        }
    }

    # conversation and messages apis

    public function allConversations($userId = null){
        $userId = base64_decode($userId);
        return Conversation::with(['teacher', 'student'])->where('teacher_id', $userId)->orWhere('student_id', $userId)->get()->map->append('last_message');
    }

    public function loadMessages($conversationId, Request $request){
        $PageSize = $request->pageSize ?? 50;
        return Message::where('conversation_id',base64_decode($conversationId))->orderBy('created_at', 'desc')->paginate($PageSize);
    }
}
