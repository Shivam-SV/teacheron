<?php

namespace App\Models;

use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'amount', 'transaction_type', 'post_purchase_id', 'payment_id'];

    protected function casts(){
        return ['transaction_type' => TransactionType::class];
    }

    public function postPurchase(){
        return $this->belongsTo(PostPurchase::class);
    }

    public function payment(){
        return $this->belongsTo(Payment::class);
    }

}
