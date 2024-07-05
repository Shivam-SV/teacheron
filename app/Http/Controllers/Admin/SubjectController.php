<?php

namespace App\Http\Controllers\Admin;

use App\Models\Subject;
use App\Traits\HasTabulator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SubjectController extends Controller{
    use HasTabulator;

    protected $model = Subject::class;

    public function index(){
        if(request()->ajax()){
            return $this->getRows();
        }

        return inertia('Admin/Subject/Index', [
            'columns' => $this->getColumnDefs()
        ]);
    }
}
