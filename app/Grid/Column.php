<?php

namespace App\Grid;

use Illuminate\Database\Eloquent\Model;

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

    public function __construct(
        public string $column,
        public string $label,
        public string $type = 'text',
    ){}

    public static function make(string $column, string $label, string $type = self::TYPE_TEXT): static{
        return new static($column, $label, $type);
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
        return [
            'column' => $this->column,
            'label' => $this->label,
            'type' => $this->type,
            'is_visible' => $this->is_visible,
            'is_sortable' => $this->is_sortable,
            'is_searchable' => $this->is_searchable,
            'sort_by' => $this->sort_by,
        ];
    }

    public function toArray(): array{
        return [
            'column' => $this->column,
            'label' => $this->label,
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
        return $this->label;
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
}
