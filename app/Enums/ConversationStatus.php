<?php

namespace App\Enums;

enum ConversationStatus: string{
    CASE INITIAL = 'initial';
    CASE ACTIVE = 'active';
    CASE EXPIRED = 'expired';
    CASE CLOSED = 'closed';
}
