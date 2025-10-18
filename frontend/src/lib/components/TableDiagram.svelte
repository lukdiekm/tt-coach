<script lang="ts">
    import { disableScrollHandling } from '$app/navigation';

    export let reversed: boolean = false;
    export let showGrid: boolean = true;
    export let progress: number = 0;

    import type { Drill } from '../types/Drill.js';

    export let drill: Drill = {
        id: 0,
        name: "empty",
        description: "",
        moves: []
    };

    function getCoordinates(position: string): { x: number, y: number } {
        const [half, col, row] = position.split('-');
        const colNum = parseInt(col);
        const rowNum = parseInt(row);
        
        // Breite und Höhe einer Zelle
        const cellWidth = 152.5 / 3;
        const cellHeight = 137 / 3;
        
        // X-Koordinate
        let x;
        if (half === 'a') {
            // A-Seite: Von links nach rechts
            x = (colNum - 1) * cellWidth + (cellWidth / 2);
        } else {
            // B-Seite: Von rechts nach links
            x = (3 - colNum) * cellWidth + (cellWidth / 2);
        }
        
        // Y-Koordinate
        let y;
        if (half === 'a') {
            // A-Seite: Von unten nach oben
            y = 274 - ((rowNum - 1) * cellHeight + (cellHeight / 2));
        } else {
            // B-Seite: Von oben nach unten
            y = (rowNum - 1) * cellHeight + (cellHeight / 2);
        }
        
        return { x, y };
    }

    // Generiere die Pfade für die Bewegungen
    $: paths = drill.moves.map(move => {
        const start = getCoordinates(move.from);
        const end = getCoordinates(move.to);
        const midY = (start.y + end.y) / 2;
        
        // Berechne den Kontrollpunkt für die quadratische Bézierkurve
        const controlX = (start.x + end.x) / 2;
        const controlY = midY + (end.y < start.y ? -30 : 30); // Wölbung der Kurve
        
        return {
            path: `M ${start.x},${start.y} Q ${controlX},${controlY} ${end.x},${end.y}`,
            color: move.color,
            start,
            end
        };
    });
</script>

<div class="table-container" class:reversed>
    progess {progress}
    <svg viewBox="0 0 152.5 274" xmlns="http://www.w3.org/2000/svg">
        <!-- Tischtennis Tisch -->
        <rect x="0" y="0" width="152.5" height="274" fill="#0B4F9C" stroke="#ffffff" stroke-width="2"/>
        
        <!-- Mittellinie (Netz) -->
        <line x1="0" y1="137" x2="152.5" y2="137" stroke="#ffffff" stroke-width="1"/>
        
        <!-- Mittellinien auf beiden Tischhälften -->
        <!-- Linke Hälfte -->
        <line x1="76.25" y1="3" x2="76.25" y2="134" stroke="#ffffff" stroke-width="0.5"/>
        <line x1="76.25" y1="140" x2="76.25" y2="271" stroke="#ffffff" stroke-width="0.5"/>
        
        {#if showGrid}
            <!-- Gitterlinien für die Zellen -->
            <!-- Vertikale Linien -->
            <line x1="50.83" y1="0" x2="50.83" y2="274" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.3"/>
            <line x1="101.67" y1="0" x2="101.67" y2="274" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.3"/>
            
            <!-- Horizontale Linien obere Hälfte -->
            <line x1="0" y1="45.67" x2="152.5" y2="45.67" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.3"/>
            <line x1="0" y1="91.33" x2="152.5" y2="91.33" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.3"/>
            
            <!-- Horizontale Linien untere Hälfte -->
            <line x1="0" y1="182.67" x2="152.5" y2="182.67" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.3"/>
            <line x1="0" y1="228.33" x2="152.5" y2="228.33" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.3"/>
            
            <!-- Koordinaten Labels -->
            <g font-size="8" fill="#ffffff" opacity="0.5">
                {#each ['a', 'b'] as half}
                    {#each Array(3) as _, row}
                        {#each Array(3) as _, col}
                            {@const coords = getCoordinates(`${half}-${col + 1}-${row + 1}`)}
                            <text x={coords.x - 10} y={coords.y + 3}>{half}-{col + 1}-{row + 1}</text>
                        {/each}
                    {/each}
                {/each}
            </g>
        {/if}
        
        <!-- Spielzüge -->
        {#each paths.slice(0, progress + 1) as path, i}
            <path 
                d={path.path}
                fill="none" 
                stroke={path.color} 
                stroke-width="2" 
                stroke-dasharray="4"
            />
            <!-- Ballposition am Start und Ende jedes Zuges -->
            <circle cx={path.start.x} cy={path.start.y} r="3" fill={path.color}/>
            {#if i === progress || i === paths.length - 1}
                <circle cx={path.end.x} cy={path.end.y} r="3" fill={path.color}/>
            {/if}
        {/each}
        
        <!-- Spieler Position (unten) -->
        <circle cx="76" cy="290" r="5" fill="#ffffff"/>
        
        <!-- Gegner Position (oben) -->
        <circle cx="76" cy="-16" r="5" fill="#ffffff"/>
    </svg>
</div>

<style>
    .table-container {
        width: 100%;
        max-width: 600px;
    }
    
    .reversed {
        transform: rotate(180deg);
    }
    
    svg {
        width: 100%;
        height: auto;
        padding: 2rem;
        border-radius: 8px;
    }
</style>