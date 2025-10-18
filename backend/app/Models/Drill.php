<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Drill extends Model
{
    protected $fillable = ['name', 'description'];

    public function moves(): HasMany
    {
        return $this->hasMany(Move::class);
    }
}
