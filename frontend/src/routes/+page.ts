import type { PageLoad } from './$types.js';
import type { Drill } from '$lib/types/Drill.js';
import fixtures from '$lib/fixtures.js';

export const load = (async () => {
    const response = await fetch(`${fixtures.API_URL}/api/drills`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const drills: Drill[] = await response.json();
    
    return {
        drills
    };
}) satisfies PageLoad;