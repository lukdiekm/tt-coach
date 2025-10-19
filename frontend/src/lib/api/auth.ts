import { env } from '$env/dynamic/public';

interface User {
    id: number;
    name: string;
    email: string;
}

const API_URL = env.PUBLIC_API_URL ?? "https://api.tt.lukas-diekmann.de"

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