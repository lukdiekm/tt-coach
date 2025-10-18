import type { PageLoad } from './$types.js';
import type { Drill } from '$lib/types/Drill.js';

export const load = (async ({ params }: { params: { id: string } }) => {
    const response = await fetch(`https://api.tt.lukas-diekmann.de/api/drills/${params.id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const drill: Drill = await response.json();
    
    return {
        drill
    };
}) satisfies PageLoad;