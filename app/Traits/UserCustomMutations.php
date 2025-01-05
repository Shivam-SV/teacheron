<?php

namespace App\Traits;

use App\Models\UserPrice;
use App\Models\WishlistUser;
use Illuminate\Support\Facades\Log;

trait UserCustomMutations {
    public function addToWishlist($userId = null) {
        WishlistUser::updateOrCreate(['user_id' => $userId ?? auth()->id(), 'saved_by' => $this->id]);
        return $this;
    }

    public function removeFromWishlist($userId = null) {
        WishlistUser::where(['user_id' => $userId ?? auth()->id(),'saved_by' => $this->id])->delete();
        return $this;
    }

    // Teacher Custom Mutations
    public function UpdatePrice($price){
        $userPrice = UserPrice::create(['user_id' => $this->id, 'price' => $price, 'updated_by' => auth()->id()]);
        Log::info('User Price Updated' . $userPrice->toJson());
        return $this;
    }
}
