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
        return Drill::all()->load('moves');
    }

    /**
     * Einen neuen Drill erstellen.
     */
    public function store(StoreDrillRequest $request)
    {
        $drill = Drill::create($request->validated());

        $i=0;
        foreach ($request->moves as $move) {
            $drill->moves()->create([...$move,'order'=>$i]);
            $i++;
        }

        return response()->json($drill->load('moves'), 201);
    }

    /**
     * Einen bestimmten Drill anzeigen.
     */
    public function show(Drill $drill)
    {
        return $drill->load('moves');
    }

    /**
     * Einen Drill aktualisieren.
     */
    public function update(StoreDrillRequest $request, Drill $drill)
    {
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
        $drill->delete();
        return response()->json(null, 204);
    }
}
