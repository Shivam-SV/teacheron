<?php

namespace App\Enums;

enum UserDocumentStatus: string{
    CASE UPLOADED = 'uploaded';
    CASE IN_REVIEW = 'in-review';
    CASE VERIFIED = 'verified';
    CASE REJECTED = 'rejected';
}