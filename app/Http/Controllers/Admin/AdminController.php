<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Traits\HasUserAuthentications;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    use HasUserAuthentications;

    protected $admin = true;
}
