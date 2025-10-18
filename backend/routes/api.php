<?php

use App\Http\Controllers\DrillController;
use Illuminate\Support\Facades\Route;

Route::resource('drills', DrillController::class);
