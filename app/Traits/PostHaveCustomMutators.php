<?php

namespace App\Traits;

use App\Models\PostImpression;
use App\Models\PostSave;

trait PostHaveCustomMutators{

    public function countImpression($user = null){
        PostImpression::updateOrCreate(['user_id' => $user?->id ?? auth()->id(), 'post_id' => $this->id], ['last_viewed_at' => now()]);
        return $this;
    }

    public function savePost($user = null){
        PostSave::updateOrCreate(['user_id' => $user?->id ?? auth()->id(), 'post_id' => $this->id], ['saved_at' => now()]);
        return $this;
    }

    public function unsavePost($user = null){
        PostSave::where('post_id', $this->id)->where('user_id', $user?->id ?? auth()->id())->delete();
        return $this;
    }
}
