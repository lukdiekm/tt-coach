<script lang="ts">
    import type { PageData } from './$types.js';
    import { invalidateAll } from '$app/navigation';
    import { UsersAPI } from '$lib/api/users';
    
    export let data: PageData;

    let { users } = data;

    async function toggleUserActive(userId: number) {
        try {
            await UsersAPI.toggleActive(userId);
            await invalidateAll(); // Neu laden der Daten
        } catch (error) {
            console.error('Error toggling user status:', error);
            alert('Failed to update user status');
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-white">User Management</h1>
    
    <div class="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-900">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                {#each users as user}
                    <tr class="bg-gray-800 hover:bg-gray-700">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{user.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{user.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                {user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                {user.active ? 'Active' : 'Inactive'}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button
                                on:click={() => toggleUserActive(user.id)}
                                class="text-sm font-medium text-blue-400 hover:text-blue-300"
                            >
                                {user.active ? 'Deactivate' : 'Activate'}
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>