<?php

namespace App\Http\Controllers\Admin;

use App\Grid\Grid;
use App\Grid\Column;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    protected $model = Post::class;
    public function index()
    {
        return Inertia::render('Admin/Posts/Index', [
            'posts' => Grid::of($this->model)
                ->columns([
                    Column::make('title'),
                    Column::make('description')->transform(fn($row) => Str::limit($row->description, 100)),
                    Column::make('purpose_id')->label('Purpose')->transform(fn($row) => $row->purpose->name),
                    Column::make('level_id')->label('Level')->transform(fn($row) => $row->level->name),
                    Column::make('status'),
                    Column::action('action')
                    // Column::action('user'),
                ])->render()
        ]);
    }

    public function show($postId)
    {
        return Inertia::render('Admin/Posts/View', ['post' => Post::with(['level', 'subjects', 'purpose', 'user', 'languagePreference'])->findOrFail(base64_decode($postId))]);
    }
}
