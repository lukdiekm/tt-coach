<script lang="ts">
    import type { PageData } from "./$types.js";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getUser } from "$lib/api/auth.js";
    import { DrillsAPI } from "$lib/api/drills.js";
    import { invalidateAll } from "$app/navigation";
    export let data: PageData;

    let userName = "";
    let userEmail = "";
    let isDeleting = false;

    onMount(async () => {
        try {
            const user = await getUser();
            userName = user.name;
            userEmail = user.email;
        } catch (error) {
            console.error("Failed to fetch user:", error);
            goto("/login");
        }
    });

    async function handleDelete(event: MouseEvent, drillId: number) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!confirm('Möchtest du diesen Drill wirklich löschen?')) {
            return;
        }

        try {
            await DrillsAPI.delete(drillId);
            await invalidateAll(); // Aktualisiert die Seite mit den neuen Daten
        } catch (error) {
            console.error('Failed to delete drill:', error);
            alert('Fehler beim Löschen des Drills');
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

<div class="flex flex-col h-screen gap-8 isolate p-4">
    <header>
        <div class="mt-6 flex items-center justify-between">
            <a
                href="/new"
                class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >New</a
            >
            <div class="flex gap-x-4">
                <div class="flex flex-col items-end">
                    <h1 class="text-xl font-semibold text-white">
                        Willkommen, {userName || "lädt..."}
                    </h1>
                    <span class="text-sm text-gray-400"
                        >{userEmail || "lädt..."}</span
                    >
                </div>
                <button
                    on:click={handleLogout}
                    class="flex-none rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >Logout</button
                >
            </div>
        </div>
    </header>

    <ul role="list" class="divide-y divide-white/5">
        {#each data.drills as drill}
            <a href="/{drill.id}" data-sveltekit-preload-data="off">
                <li class="flex justify-between gap-x-6 py-5">
                    <div class="flex min-w-0 gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm/6 font-semibold text-white">
                                {drill.name}
                            </p>
                            <p class="mt-1 truncate text-xs/5 text-gray-400">
                                {drill.description}
                            </p>
                        </div>
                    </div>
                    <div class="shrink-0 sm:flex sm:flex-col sm:items-end gap-2">
                        <span
                            class="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 inset-ring inset-ring-indigo-400/30"
                            >{drill.moves.length} moves</span
                        >
                        <button
                            on:click={(e) => handleDelete(e, drill.id)}
                            disabled={isDeleting}
                            class="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                        >
                                Delete
                        </button>
                    </div>
                </li>
            </a>
        {/each}
    </ul>
</div>

<style lang="scss">
</style>
