<?php

namespace App\Enums;

enum PostStatus: string{
    CASE OPEN = 'open';
    CASE ON_HOLD = 'on-hold';
    CASE FULFILLED = 'fulfilled';
    CASE CANCEL = 'cancel';
    CASE IN_PROGRESS = 'in-progress';
}
