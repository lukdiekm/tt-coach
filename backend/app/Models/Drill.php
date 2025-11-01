<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Drill extends Model
{
    protected $fillable = ['name', 'description', 'is_public', 'drill_category_id', 'owner_id'];

    protected $casts=[
        'is_public' => 'boolean',
    ];

    public function moves(): HasMany
    {
        return $this->hasMany(Move::class);
    }

    public function drillCategory(): BelongsTo
    {
        return $this->belongsTo(DrillCategory::class);
    }
}
