<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'payment_method_id', 'transaction_id', 'amount', 'currency_code', 'status', 'status_updated_at', 'description'];

    protected function casts(){
        return [
            'status_updated_at' => 'datetime',
            'status' => PaymentStatus::class
        ];
    }

}
