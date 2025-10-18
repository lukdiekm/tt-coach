import type { PageLoad } from './$types.js';

// This page doesn't need to load any data since we're creating a new drill
export const load = (() => {
    return {};
}) satisfies PageLoad;