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

<div class="container py-4">
    <div class="mb-3">
        <a href="/" class="btn btn-primary">Back</a>
    </div>

    <h1 class="h2 mb-4 text-white">User Management</h1>
    
    <div class="card bg-dark border-secondary">
        <div class="table-responsive">
            <table class="table table-dark table-hover mb-0">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each users as user}
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <span class="badge {user.active ? 'bg-success' : 'bg-danger'}">
                                    {user.active ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td>
                                <button
                                    on:click={() => toggleUserActive(user.id)}
                                    class="btn btn-sm btn-outline-primary"
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
</div>