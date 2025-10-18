import type { PageLoad } from './$types.js';
import type { Drill } from '$lib/types/Drill.js';

export const load = (async ({ params }: { params: { id: string } }) => {
    const response = await fetch(`http://127.0.0.1:8000/api/drills/${params.id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const drill: Drill = await response.json();
    
    return {
        drill
    };
}) satisfies PageLoad;