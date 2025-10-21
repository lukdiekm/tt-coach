import { UsersAPI } from '$lib/api/users';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    try {
        const users = await UsersAPI.getAll();
        return { users };
    } catch (error) {
        console.error('Failed to load users:', error);
        return { users: [] };
    }
};