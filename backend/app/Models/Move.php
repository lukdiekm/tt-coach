<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Move extends Model
{
    protected $fillable = [
        'from',
        'to',
        'color',
        'instruction',
        'label',
        'order',
        'drill_id',
    ];

    public function drill(): BelongsTo
    {
        return $this->belongsTo(Drill::class);
    }
}
