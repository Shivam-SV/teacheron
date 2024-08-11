<?php

namespace App\Enums;

enum UserLoginTypes: string
{
    case WEB = 'web';
    case SOCIAL = 'social';
    case GUEST = 'guest';
}
