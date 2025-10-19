import { env } from '$env/dynamic/public';
import fixtures from '$lib/fixtures.js';

interface User {
    id: number;
    name: string;
    email: string;
}

const API_URL = fixtures.API_URL;

export async function getUser(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/api/user`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return response.json();
}