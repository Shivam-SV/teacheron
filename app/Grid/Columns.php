<?php

class Columns{
    public function __construct(
        protected array $columns,
    ){}

    public function toArray(){
        return $this->map(fn($column) => $column->toArr);
    }
    public function getColumnsLabels():array{
        return $this->map(fn($column) => $column->getLabel());
    }
    public function getColumnsColumn():array{
        return $this->map(fn($column) => $column->getColumn());
    }
    public function getColumnsTypes():array{
        return $this->map(fn($column) => $column->getType());
    }
    public function getColumnsIsVisible():array{
        return $this->map(fn($column) => $column->getIsVisible());
    }
    public function getColumnsIsSortable():array{
        return $this->map(fn($column) => $column->getIsSortable());
    }
    public function getColumnsIsSearchable():array{
        return $this->map(fn($column) => $column->getIsSearchable());
    }
    public function getColumnsSortBy():array{
        return $this->map(fn($column) => $column->getSortBy());
    }

    public function map(callable $callback):array{
        $buffer = [];
        foreach($this->columns as $column) $buffer[] = $callback($column);
        return $buffer;
    }

    public function findColumn(callable $callback):Column|null{
        $column = null;
        foreach($this->columns as $column) if(($column = $callback($column))) break;
        return $column;
    }
}