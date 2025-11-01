<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDrillRequest;
use App\Models\Drill;
use App\Models\DrillCategory;

class DrillCategoryController extends Controller
{
    public function index()
    {
        return DrillCategory::all();
    }
}
