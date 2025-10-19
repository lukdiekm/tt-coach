import type { PageLoad } from './$types.js';
import { DrillsAPI } from '$lib/api/drills.js';

export const ssr = false;

export const load = (async () => {
    const drills = await DrillsAPI.list();
    
    return {
        drills
    };
    
    return {
        drills
    };
}) satisfies PageLoad;