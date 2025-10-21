import fixtures from '$lib/fixtures.js';
import type { User } from '$lib/types/user'; // Adjust the import path as needed
const API_URL = fixtures.API_URL;
export class UsersAPI {

       private static getHeaders() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Not authenticated');
        }
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }


    static async getAll(): Promise<User[]> {
        const response = await fetch(`${API_URL}/api/users`, {
            credentials: 'include',
              headers: this.getHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        return response.json();
    }

    static async toggleActive(userId: number): Promise<User> {
        const response = await fetch(`${API_URL}/api/users/${userId}/toggle-active`, {
            method: 'PATCH',
            credentials: 'include',
             headers: this.getHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to toggle user status');
        }

        return response.json();
    }
}