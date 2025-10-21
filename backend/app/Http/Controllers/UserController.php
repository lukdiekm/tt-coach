<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function toggleActive(User $user)
    {
        $user->active = !$user->active;
        $user->save();

        return response()->json($user);
    }
}