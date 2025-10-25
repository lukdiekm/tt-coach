<script lang="ts">
    import type { PageData } from "./$types.js";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getUser } from "$lib/api/auth.js";
    import { DrillsAPI } from "$lib/api/drills.js";
    import type { User } from "$lib/types/User.js";
    import { invalidateAll } from "$app/navigation";
    export let data: PageData;

    let user: User | null = null;
    let isDeleting = false;

    onMount(async () => {
        try {
            user = await getUser();
        } catch (error) {
            console.error("Failed to fetch user:", error);
            goto("/login");
        }
    });

    async function handleDelete(event: MouseEvent, drillId: number) {
        event.preventDefault();
        event.stopPropagation();

        if (!confirm("Möchtest du diesen Drill wirklich löschen?")) {
            return;
        }

        try {
            isDeleting = true;
            await DrillsAPI.delete(drillId);
            await invalidateAll(); // Aktualisiert die Seite mit den neuen Daten
        } catch (error) {
            console.error("Failed to delete drill:", error);
            alert("Fehler beim Löschen des Drills");
        }
    }

    async function handleLogout() {
        try {
            localStorage.removeItem("token");
            goto("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
</script>

<div class="container-fluid p-4 min-vh-100">
    <header>
        <div class="d-flex justify-content-between align-items-center mt-3 mb-4">
            <div class="d-flex gap-3">
                <a href="/new" class="btn btn-primary">New</a>
                <a href="/users" class="btn btn-primary">Users</a>
            </div>
            <div class="d-flex gap-3 align-items-center">
                <div class="text-end">
                    <h1 class="h5 mb-0 text-white">
                        Willkommen, {user?.name || "lädt..."}
                    </h1>
                    <span class="text-muted small"
                        >{user?.email || "lädt..."}</span
                    >
                </div>
                <button
                    on:click={handleLogout}
                    class="btn btn-secondary"
                    >Logout</button
                >
            </div>
        </div>
    </header>

    <ul class="list-group list-group-flush">
        {#each data.drills as drill}
            <a href="/{drill.id}" data-sveltekit-preload-data="off" class="text-decoration-none">
                <li class="list-group-item bg-dark border-secondary d-flex justify-content-between align-items-start py-3">
                    <div class="flex-grow-1">
                        <div class="fw-semibold text-white mb-1">
                            {drill.name}
                        </div>
                        <p class="text-muted small mb-0 text-truncate">
                            {drill.description}
                        </p>
                    </div>
                    <div class="d-flex flex-column align-items-end gap-2">
                        <span class="badge bg-primary text-white">
                            {drill.moves.length} moves
                        </span>
                        {#if drill.owner_id === user?.id}
                            <button
                                on:click={(e) => handleDelete(e, drill.id)}
                                disabled={isDeleting}
                                class="btn btn-sm btn-outline-danger"
                            >
                                Delete
                            </button>
                        {/if}
                    </div>
                </li>
            </a>
        {/each}
    </ul>
</div>

<style lang="scss">
</style>
