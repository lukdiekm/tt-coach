import type { PageLoad } from './[id]/$types.js';
import { DrillsAPI } from '$lib/api/drills.js';

export const ssr = false;

export const load = (async ({ params }) => {
    const drill = await DrillsAPI.get(params.id);
    
    return {
        drill
    };
}) satisfies PageLoad;
