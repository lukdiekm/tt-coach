interface User {
    id: number;
    name: string;
    email: string;
}

export async function getUser(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch('http://127.0.0.1:8000/api/user', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return response.json();
}