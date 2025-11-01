<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DrillCategory extends Model
{
    protected $fillable = ['name', 'color'];

    public function drills(): HasMany
    {
        return $this->hasMany(Drill::class);
    }
}
