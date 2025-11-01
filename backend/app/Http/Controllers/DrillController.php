<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDrillRequest;
use App\Models\Drill;

class DrillController extends Controller
{
    /**
     * Liste aller Drills zurückgeben.
     */
    public function index()
    {
        $userId = request()->user()->id;

        return Drill::where('is_public', true)
            ->orWhere('owner_id', $userId)
            ->with(['moves', 'drillCategory'])
            ->get();
    }

    /**
     * Einen neuen Drill erstellen.
     */
    public function store(StoreDrillRequest $request)
    {
        $drill = new Drill();
        $drill->name = $request->name;
        $drill->description = $request->description;
        $drill->is_public = $request->isPublic;
        $drill->drill_category_id = $request->drill_category_id;
        $drill->owner_id = $request->user()->id;
        $drill->save();

        $i = 0;
        foreach ($request->moves as $move) {
            $drill->moves()->firstOrCreate(['id' => $move->id], [...$move, 'order' => $i]);
            $i++;
        }

        return response()->json($drill->load(['moves', 'drillCategory']), 201);
    }

    /**
     * Einen bestimmten Drill anzeigen.
     */
    public function show(Drill $drill)
    {
        return $drill->load(['moves', 'drillCategory']);
    }

    /**
     * Einen Drill aktualisieren.
     */
    public function update(StoreDrillRequest $request, Drill $drill)
    {
        if ($request->user()->id !== $drill->owner_id) {
            return response(status: 403);
        }

        $drill->update($request->validated());
        $drill->is_public = $request->is_public;
        $drill->drillCategory()->associate($request->drill_category_id);
        foreach ($request->moves as $move) {
            $drill->moves()->firstOrCreate(['id' => $move['id']], $move);
        }
        $drill->save();

        return response()->json($drill->load(['moves', 'drillCategory']), 201);
    }

    /**
     * Einen Drill löschen.
     */
    public function destroy(Drill $drill)
    {
        if (request()->user()->id !== $drill->owner_id) {
            return response(status: 403);
        }

        $drill->delete();
        return response()->json(null, 204);
    }
}
