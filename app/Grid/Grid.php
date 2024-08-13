<?php

namespace App\Grid;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class Grid{

    /**
     * Holds the columns of the grid
     * @var Collection<Column>
     */
    protected Collection $columns;

    /**
     * Holds the request object
     */
    protected Request $request;

    /**
     * default number of items per page
     */
    protected $defaultPerPage = 10;

    /**
     * Possible pagination options
     */
    protected $paginationOptions = [10, 25, 50, 100];

    /**
     * @param $model
     */
    public function __construct(protected $model){}

    /**
     * Create a new grid instance
     * @param $model
     * @return static
     */
    public static function of($model): static{
        return new static($model);
    }

    /**
     * Get the data from request, filter, sort, paginate and return the data
     */
    public function render(): Collection{
        $this->request = request();
        $query = is_string($this->model) ? $this->model::query() : $this->model;

        $query = $this->getSelectiveColumns($query);
        $query = $this->applyFilters($query);
        $query = $this->applySorts($query);
        $query = $this->applyPagination($query);

        return collect(['columns' => $this->columns->map(fn(Column $column) => $column->toArray()), ...$query->toArray(), 'pagination' => $this->paginationOptions]);
    }

    public function columns(array $columns): static {
        $this->columns = collect($columns);
        return $this;
    }

    public function getSelectiveColumns(Builder $query): Builder {
        return $query->select($this->columns->map(fn(Column $column) => $column->getColumn())->toArray());
    }

    /**
     * Apply filters to the query
     */
    public function applyFilters(Builder $query): Builder {
        if($this->request->has('search')){
            $query->where(function(Builder $query) {
                $this->columns->each(function(Column $column) use ($query){
                    if($column->getIsSearchable()){
                        $query->where($column->getColumn(), 'like', '%' . request('search') . '%');
                    }
                });
            });
        }
        return $query;
    }

    /**
     * Apply sorts to the query
     */
    public function applySorts(Builder $query): Builder {
        if($this->request->has('sort')){
            $column = $this->columns->first(fn(Column $column) => key($this->request->sort) === $column->getColumn() && $column->getIsSortable());
            if($column){
                $column->sortBy($this->request->sort[$column->getColumn()]);
                $query->orderBy($column->getColumn(), $column->getSortBy());
            }
        }
        return $query;
    }

    /**
     * Apply pagination to the query
     */
    public function applyPagination(Builder $query): LengthAwarePaginator {
        return $query->paginate($this->request->per_page ?? $this->defaultPerPage);
    }

    /**
     * Set the pagination options
     */
    public function paginationOptions(array $options): static {
        $this->paginationOptions = $options;
        return $this;
    }
}
