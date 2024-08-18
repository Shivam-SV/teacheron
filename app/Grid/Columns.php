<?php

namespace App\Grid;

use ArrayAccess;

class Columns implements ArrayAccess{
    public function __construct(
        protected array $columns,
    ){}

    public function toArray($excludedActions = false){
        return $this->map(fn($column) => $excludedActions ? (!$column->isAction() ? $column->toArray() : null) : $column->toArray());
    }
    public function getColumnsLabels($excludedActions = false):array{
        return $this->map(fn($column) => $excludedActions ? (!$column->isAction() ? $column->getLabel() : null) : $column->getLabel());
    }
    public function getColumnsColumn($excludedActions = false):array{
        return $this->map(fn($column) => $excludedActions ? (!$column->isAction() ? $column->getColumn() : null) : $column->getColumn());
    }
    public function getColumnsTypes($excludedActions = false):array{
        return $this->map(fn($column) => $excludedActions ? (!$column->isAction() ? $column->getType() : null) : $column->getType());
    }
    public function getColumnsIsVisible($excludedActions = false):array{
        return $this->map(fn($column) => $excludedActions ? (!$column->isAction() ? $column->getIsVisible() : null) : $column->getIsVisible());
    }
    public function getColumnsIsSortable($excludedActions = false):array{
        return $this->map(fn($column) => $excludedActions ? (!$column->isAction() ? $column->getIsSortable() : null) : $column->getIsSortable());
    }
    public function getColumnsIsSearchable($excludedActions = false):array{
        return $this->map(fn($column) => $excludedActions ? (!$column->isAction() ? $column->getIsSearchable() : null) : $column->getIsSearchable());
    }
    public function getColumnsSortBy($excludedActions = false):array{
        return $this->map(fn($column) => $excludedActions ? (!$column->isAction() ? $column->getSortBy() : null) : $column->getSortBy());
    }

    public function map(callable $callback):array{
        $buffer = [];
        foreach($this->columns as $column) $buffer[] = $callback($column);
        return array_filter($buffer);
    }

    public function findColumn(callable $callback):Column|null{
        $column = null;
        foreach($this->columns as $column) if(($column = $callback($column))) break;
        return $column;
    }

    public function offsetExists(mixed $offset):bool{
        return array_key_exists($offset,$this->columns);
    }

    public function offsetGet(mixed $offset):Column{
        return $offset && $this->offsetExists($offset) ? $this->columns[$offset] : null;
    }

    public function offsetSet(mixed $offset, mixed $column):void{
        $this->columns[$offset] = $column;
    }

    public function offsetUnset(mixed $offset):void{
        unset($this->column[$offset]);
    }
}
