<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use
        SoftDeletes,
        \App\Traits\PostHaveRelations,
        \App\Traits\PostHaveCustomAttributes,
        \App\Traits\PostHaveCustomMutators;

    protected $fillable = [
        'title', 'description','address','country_id', 'user_phone_id', 'created_by_user_id', 'purpose_id',
        'level_id', 'gender_preference', 'status', 'min_budget',
        'max_budget', 'budget_currency_code',
    ];
    protected $appends = ['budget', 'posted_since', 'impressions_count'];
}
