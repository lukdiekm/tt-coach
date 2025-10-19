import type { Drill } from '$lib/types/Drill.js';
import { PUBLIC_API_URL } from '$env/static/public'

export class DrillsAPI {
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

    static async list(): Promise<Drill[]> {
        const response = await fetch(`${PUBLIC_API_URL}/api/drills`, {
            headers: this.getHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Not authenticated');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async get(id: number | string): Promise<Drill> {
        const response = await fetch(`${PUBLIC_API_URL}/api/drills/${id}`, {
            headers: this.getHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Not authenticated');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async create(drill: Omit<Drill, 'id'>): Promise<Drill> {
        const response = await fetch(`${PUBLIC_API_URL}/api/drills`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(drill)
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Not authenticated');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async update(id: number | string, drill: Partial<Drill>): Promise<Drill> {
        const response = await fetch(`${PUBLIC_API_URL}/api/drills/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(drill)
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Not authenticated');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async delete(id: number | string): Promise<void> {
        const response = await fetch(`${PUBLIC_API_URL}/api/drills/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Not authenticated');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
}