import type { PageLoad } from './$types.js';
import type { Drill } from '$lib/types/Drill.js';
import fixtures from '$lib/fixtures.js';

export const load = (async ({ params }: { params: { id: string } }) => {
    const response = await fetch(`${fixtures.API_URL}/api/drills/${params.id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const drill: Drill = await response.json();
    
    return {
        drill
    };
}) satisfies PageLoad;