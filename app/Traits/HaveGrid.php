<?php

namespace App\Traits;

trait HaveGrid{

    protected $defaultPageSize = 10;

    protected $pageSizes = [5, 10, 20, 40, 50, 70, 100];

    public function getQueryData(?callable $queryClause = null){
        $request = request();
        $query = $this->model::select();

        if($request->has('pageSize') && in_array($request->pageSize, $this->pageSizes)) $this->defaultPageSize = $request->pageSize;
        if($queryClause) $query = $queryClause($query);

        return $query->paginate($this->defaultPageSize);
    }

    public function getColumns(){
        return $this->model::GridColumns();
    }

    public function defaultViewData(){
        $request = request();
        if($request->has('pageSize') && in_array($request->pageSize, $this->pageSizes)) $this->defaultPageSize = $request->pageSize;
        return [
            'defaultPageSize' => $this->defaultPageSize,
            'pageSizes' => $this->pageSizes,
            'columns' => $this->getColumns()
        ];
    }
}
