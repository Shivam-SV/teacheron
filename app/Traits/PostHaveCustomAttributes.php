<?php

namespace App\Traits;

use Carbon\CarbonInterface;
use Illuminate\Support\Carbon;

trait PostHaveCustomAttrbutes{
    protected $appends = ['budget', 'posted_since', 'impressions_count'];

    public function getBudgetAttribute(){
        return intval($this->min_budget) . " - " . intval($this->max_budget);
    }

    public function getPostedSinceAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans(now(), CarbonInterface::DIFF_RELATIVE_TO_NOW);
    }

    public function getImpressionsCountAttribute(){
        return $this->impressions()->count();
    }
}
