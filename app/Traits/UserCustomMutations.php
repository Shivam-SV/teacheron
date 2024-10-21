<?php

namespace App\Traits;

use App\Models\WishlistUser;

trait UserCustomMutations {
    public function addToWishlist($userId = null) {
        WishlistUser::updateOrCreate(['user_id' => $userId ?? auth()->id(), 'saved_by' => $this->id]);
        return $this;
    }

    public function removeFromWishlist($userId = null) {
        WishlistUser::where(['user_id' => $userId ?? auth()->id(),'saved_by' => $this->id])->delete();
        return $this;
    }
}
