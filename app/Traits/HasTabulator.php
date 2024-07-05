<?php

namespace App\Traits;

trait HasTabulator{

    /**
     * Return the column definations defined in the model according to tabulator
     */
    public function getColumnDefs(){
        return $this->model::TabulatorColumns();
    }

    /**
     * Prepares a query, attach a callback and returns the paginated data
     */
    public function getRows(?callable $queryCallback = null){
        $modelQuery = $this->model::query();

        if($queryCallback){
            $queryCallback($modelQuery);
        }

        return $modelQuery->pagination();
    }
}
