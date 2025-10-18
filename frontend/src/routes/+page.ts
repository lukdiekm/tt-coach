import type { PageLoad } from './$types.js';
import type { Drill } from '$lib/types/Drill.js';

export const load = (async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/drills`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const drills: Drill[] = await response.json();
    
    return {
        drills
    };
}) satisfies PageLoad;