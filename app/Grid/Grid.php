<?php

namespace App\Grid;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class Grid{

    /**
     * Holds the columns of the grid
     * @var Columns<Column>
     */
    protected Columns $columns;

    /**
     * Holds the request object
     */
    protected Request $request;

    /**
     * default number of items per page
     */
    protected int $defaultPerPage = 10;

    /**
     * Possible pagination options
     */
    protected array $paginationOptions = [10, 25, 50, 100];

    private string $query = '';

    private array $queryBindings = [];

    private array $requireColumns = ['id'];

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

        # filtering and sorting with query
        $query = $this->applyFilters($query);
        $query = $this->applySorts($query);
        # apply selective columns
        $query = $this->getSelectiveColumns($query);
        # capturing the query
        $this->captureQuery($query);
        # applying paginations
        $query = $this->applyPagination($query);
        # transforming rows
        $query = $this->transformRows($query);

        return collect([
            'columns' => $this->columns->toArray(),
            ...$query->toArray(),
            'pagination' => $this->paginationOptions,
            "query" => $this->query,
            "bindings" => $this->queryBindings
        ]);
    }

    public function columns(array $columns): static {
        $this->columns = new Columns($columns);
        return $this;
    }

    protected function getSelectiveColumns(Builder $query): Builder {
        return $query->select(array_merge($this->columns->getColumnsColumn(true), $this->requireColumns));
    }

    /**
     * Apply filters to the query
     */
    protected function applyFilters(Builder $query): Builder {
        if($this->request->has('search')){
            $query->where(function(Builder $query) {
                $this->columns->map(function($column) use($query){
                    if($column->getIsSearchable()){
                        $query->where($column->getColumn(), 'like', '%' . $this->request->get('search') . '%');
                    }
                });
            });
        }
        return $query;
    }

    /**
     * Apply sorts to the query
     */
    protected function applySorts(Builder $query): Builder {
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
    protected function applyPagination(Builder $query): LengthAwarePaginator {
        return $query->paginate($this->request->per_page ?? $this->defaultPerPage);
    }

    /**
     * Set the pagination options
     */
    protected function paginationOptions(array $options): static {
        $this->paginationOptions = $options;
        return $this;
    }

    protected function captureQuery($query){
        $this->query = $query->toSql();
        $this->queryBindings = $query->getBindings();
    }

    protected function transformRows($query){
        $rows = clone $query;
        foreach($rows as $row){
            $this->columns->map(fn($column) => $column->isTransformable() ? ($row[$column->getColumn()] = $column->callTransformer($row)) : null);
        }
        return $rows;
    }
}
