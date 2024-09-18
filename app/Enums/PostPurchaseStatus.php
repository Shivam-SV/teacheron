<?php

namespace App\Enums;

enum PostPurchaseStatus:string{
    CASE INITIATED = 'initiated';
    CASE ACTIVE = 'active';
    CASE EXPIRED = 'expired';
    CASE CANCELLED = 'cancelled';
}
