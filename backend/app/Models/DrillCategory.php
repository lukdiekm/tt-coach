<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DrillCategory extends Model
{
    protected $fillable = ['name', 'color'];
    
    public function drills()
    {
        return $this->hasMany(Drill::class);
    }
}
