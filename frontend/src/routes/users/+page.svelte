<script lang="ts">
    import type { PageData } from "./$types.js";
    import { invalidateAll } from "$app/navigation";
    import { UsersAPI } from "$lib/api/users";

    export let data: PageData;

    let { users } = data;

    async function toggleUserActive(userId: number) {
        try {
            await UsersAPI.toggleActive(userId);
            await invalidateAll(); // Neu laden der Daten
        } catch (error) {
            console.error("Error toggling user status:", error);
            alert("Ein Fehler ist aufgetreten beim Ändern des Benutzerstatus.");
        }
    }
</script>

<div class="container-fluid p-4 min-vh-100">
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
            <!-- Header Card -->
            <div
                class="card border-0 bg-dark bg-opacity-50 mb-4"
                style="backdrop-filter: blur(10px);"
            >
                <div class="card-body p-4">
                    <div
                        class="d-flex justify-content-between align-items-center flex-wrap gap-3"
                    >
                        <a href="/" class="btn btn-primary rounded-pill">
                            <i class="bi bi-arrow-left"></i>
                        </a>
                        <h1 class="h4 mb-0 text-light">Benutzer</h1>
                    </div>
                </div>
            </div>

            <!-- Users List -->
            <div
                class="card border-0 bg-dark bg-opacity-50"
                style="backdrop-filter: blur(10px);"
            >
                <div class="card-body p-0">
                    <ul class="list-group list-group-flush bg-transparent">
                        {#each users as user}
                            <li
                                class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center py-3 px-4"
                            >
                                <div class="flex-grow-1">
                                    <div class="fw-semibold text-light mb-1">
                                        {user.name}
                                    </div>
                                    <p class="text-muted small mb-0">
                                        {user.email}
                                    </p>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                                    <span
                                        class="badge {user.active
                                            ? 'bg-success'
                                            : 'bg-danger'} rounded-pill"
                                    >
                                        {user.active ? "Aktiv" : "Inaktiv"}
                                    </span>
                                    <button
                                        on:click={() =>
                                            toggleUserActive(user.id)}
                                        class="btn btn-sm btn-outline-primary rounded-pill"
                                    >
                                        {user.active
                                            ? "Deaktivieren"
                                            : "Aktivieren"}
                                    </button>
                                </div>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
