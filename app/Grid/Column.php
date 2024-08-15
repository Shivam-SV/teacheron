<?php

namespace App\Grid;

class Column{

    const TYPE_TEXT = 'text';
    const TYPE_NUMBER = 'number';
    const TYPE_DATE = 'date';
    const TYPE_DATETIME = 'datetime';
    const TYPE_BOOLEAN = 'boolean';

    protected bool $is_visible = true;
    protected bool $is_sortable = true;
    protected bool $is_searchable = true;
    protected string $sort_by = '';
    protected string $label;
    protected bool $isRelatedColumn = false;

    public function __construct(
        public string $column,
        public string $type = 'text',
    ){}

    public static function make(string $column, string $type = self::TYPE_TEXT): static{
        if(str_contains($column,'.')) $this->isRelatedColumn = true;
        return new static($column, $type);
    }

    public function makeLabel(string $column): string{
        if(str_contains($column,'.')) $column = array_pop(explode('.', $column));
        return ucfirst($column);
    }

    public function label(string $label): static{
        $this->label = $label;
        return $this;
    }

    public function visible(bool $is_visible = true): static{
        $this->is_visible = $is_visible;
        return $this;
    }

    public function sortable(bool $is_sortable = true): static{
        $this->is_sortable = $is_sortable;
        return $this;
    }

    public function searchable(bool $is_searchable = true): static{
        $this->is_searchable = $is_searchable;
        return $this;
    }

    public function sortBy(string $sortBy): static{
        $this->sort_by = $sortBy;
        return $this;
    }

    public function __toString(): string{
        return json_encode([
            'column' => $this->column,
            'label' => $this->label ?? $this->makeLabel($this->column),
            'type' => $this->type,
            'is_visible' => $this->is_visible,
            'is_sortable' => $this->is_sortable,
            'is_searchable' => $this->is_searchable,
            'sort_by' => $this->sort_by,
        ]);
    }

    public function toArray(): array{
        return [
            'column' => $this->column,
            'label' => $this->label ?? $this->makeLabel($this->column),
            'type' => $this->type,
            'is_visible' => $this->is_visible,
            'is_sortable' => $this->is_sortable,
            'is_searchable' => $this->is_searchable,
            'sort_by' => $this->sort_by,
        ];
    }

    # getters and setters for column attributes
    public function getColumn(): string{
        return $this->column;
    }

    public function getLabel(): string{
        return $this->label ?? $this->makeLabel($this->column);
    }

    public function getType(): string{
        return $this->type;
    }

    public function getIsVisible(): bool{
        return $this->is_visible;
    }

    public function getIsSortable(): bool{
        return $this->is_sortable;
    }

    public function getIsSearchable(): bool{
        return $this->is_searchable;
    }

    public function getSortBy(): string{
        return $this->sort_by;
    }

    public function isRelationColumn():bool{
        return $this->isRelatedColumn;
    }
}