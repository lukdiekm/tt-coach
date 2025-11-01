<script lang="ts">
    import type { PageData } from "./$types.js";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getUser } from "$lib/api/auth.js";
    import type { User } from "$lib/types/User.js";
    export let data: PageData;

    let user: User | null = null;

    onMount(async () => {
        try {
            user = await getUser();
        } catch (error) {
            console.error("Failed to fetch user:", error);
            goto("/login");
        }
    });

    

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
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
            <!-- Header Card -->
            <div class="card border-0 bg-dark bg-opacity-50 mb-4" style="backdrop-filter: blur(10px);">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div class="d-flex gap-3">
                            <a href="/new" class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                                <i class="bi bi-plus-lg"></i>
                            </a>
                            <a href="/users" class="btn btn-primary rounded-pill">Users</a>
                        </div>
                        <div class="d-flex gap-3 align-items-center">
                            <button
                                on:click={handleLogout}
                                class="btn btn-outline-light rounded-pill"
                                >Logout</button
                            >
                        </div>
                    </div>
                </div>
            </div>

            <!-- Drills List -->
            <div class="card border-0 bg-dark bg-opacity-50" style="backdrop-filter: blur(10px);">
                <div class="card-body p-0">
                    <ul class="list-group list-group-flush bg-transparent">
                        {#each data.drills as drill}
                            <a href="/{drill.id}" data-sveltekit-preload-data="off" class="text-decoration-none">
                                <li class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-start py-3 px-4">
                                    <div class="flex-grow-1">
                                        <div class="fw-semibold text-light mb-1">
                                            {drill.name}
                                        </div>
                                        <p class="text-muted small mb-0 text-truncate">
                                            {drill.description}
                                        </p>
                                    </div>
                                    <div class="d-flex flex-column align-items-end gap-2">
                                        <span class="badge bg-primary text-white rounded-pill">
                                            {drill.moves.length} moves
                                        </span>
                                    </div>
                                </li>
                            </a>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
</style>
