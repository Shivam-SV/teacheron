<?php

namespace App\Traits;

use App\Enums\TransactionType;

trait HasWallet{

    public function getWalletbalanceAttribute(){
        return $this->wallet()->where('transaction_type', TransactionType::CREDIT)->sum('amount') - $this->wallet()->where('transaction_type', TransactionType::DEBIT)->sum('amount');
    }

    public function debitCoins($amount, $reason = null){
        $this->wallet()->create([
            'amount' => $amount,
            'transaction_type' => TransactionType::DEBIT,
            'reason' => $reason
        ]);
    }

    public function creditCoins($amount, $reason = null){
        $this->wallet()->create([
            'amount' => $amount,
            'transaction_type' => TransactionType::CREDIT,
            'reason' => $reason
        ]);
    }
}
