import type { PageLoad } from './$types.js';
import type { Drill } from '$lib/types/Drill.js';

export const load = (async () => {
    const response = await fetch(`https://api.tt.lukas-diekmann.de/api/drills`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const drills: Drill[] = await response.json();
    
    return {
        drills
    };
}) satisfies PageLoad;