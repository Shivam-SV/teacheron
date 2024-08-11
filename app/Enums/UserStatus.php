<?php

namespace App\Enums;

enum UserStatus: string
{
    case DEACTIVE = 'deactive';
    case ACTIVE = 'active';
    case SUSPENDED = 'suspended';
    case BANNED = 'banned';
}
