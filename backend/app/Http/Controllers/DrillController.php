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
//        $drill = Drill::create($request->validated());
        $drill = new Drill();
        $drill->name = $request->name;
        $drill->description = $request->description;
        $drill->is_public = $request->isPublic;
        $drill->drillCategory()->associate($request->category_id);
        $drill->owner_id = $request->user()->id;
        $drill->save();

        $i = 0;
        foreach ($request->moves as $move) {
            $drill->moves()->create([...$move, 'order' => $i]);
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

        foreach ($request->moves as $move) {
            $drill->moves()->create($move);
        }

        return response()->json($drill->load('moves'), 201);
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
