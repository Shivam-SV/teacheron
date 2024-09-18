<?php

namespace App\Enums;

enum PaymentStatus: string{
    CASE INITIATED = 'initiated';
    CASE PENDING = 'pending';
    CASE COMPLETED = 'completed';
    CASE FAILED = 'failed';
}
