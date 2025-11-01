import fixtures from '$lib/fixtures.js';
import type { DrillCategory } from '$lib/types/DrillCategory.js';

const API_URL = fixtures.API_URL;

export class DrillCategoriesAPI {
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

    static async list(): Promise<DrillCategory[]> {
        const response = await fetch(`${API_URL}/api/drillCategories`, {
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
}
