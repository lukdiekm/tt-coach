<script lang="ts">
    import type { PageData } from "./[id]/$types.js";
    import { goto } from "$app/navigation";
    import { DrillsAPI } from "$lib/api/drills.js";
    import type { Drill } from "$lib/types/Drill.js";

    export let data: PageData;

    let name = data.drill.name;
    let description = data.drill.description;
    let moves = [...data.drill.moves];
    let isPublic = data.drill.isPublic;
    let isSaving = false;
    let errorMessage = "";
    let isDeleting = false;

    async function handleSubmit() {
        isSaving = true;
        errorMessage = "";

        try {
            const updatedDrill: Partial<Drill> = {
                name,
                description,
                moves,
                isPublic,
            };

            await DrillsAPI.update(data.drill.id, updatedDrill);
            goto(`/${data.drill.id}`);
        } catch (error) {
            errorMessage =
                error instanceof Error
                    ? error.message
                    : "Ein Fehler ist aufgetreten";
        } finally {
            isSaving = false;
        }
    }

    function handleCancel() {
        goto(`/${data.drill.id}`);
    }

    async function handleDelete(event: MouseEvent, drillId: number) {
        event.preventDefault();
        event.stopPropagation();

        if (!confirm("Möchtest du diesen Drill wirklich löschen?")) {
            return;
        }

        try {
            isDeleting = true;
            await DrillsAPI.delete(drillId);
            goto("/");
        } catch (error) {
            console.error("Failed to delete drill:", error);
            alert("Fehler beim Löschen des Drills");
            isDeleting = false;
        }
    }
</script>

<div class="container-fluid p-4 min-vh-100">
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
            <div
                class="card border-0 bg-dark bg-opacity-50 mb-4"
                style="backdrop-filter: blur(10px);"
            >
                <div class="card-body p-4">
                    <div
                        class="d-flex justify-content-between align-items-center mb-4"
                    >
                        <h2 class="h4 mb-0 text-light">Drill bearbeiten</h2>
                        <button
                            type="button"
                            on:click={handleCancel}
                            class="btn btn-outline-light rounded-pill"
                        >
                            Abbrechen
                        </button>
                    </div>

                    {#if errorMessage}
                        <div class="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    {/if}

                    <form on:submit|preventDefault={handleSubmit}>
                        <!-- Drill Name -->
                        <div class="mb-4">
                            <label
                                for="name"
                                class="form-label text-light fw-bold"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                bind:value={name}
                                class="form-control form-control-lg"
                                placeholder="Drill Name"
                            />
                        </div>

                        <!-- Drill Description -->
                        <div class="mb-4">
                            <label
                                for="description"
                                class="form-label text-light fw-bold"
                            >
                                Beschreibung
                            </label>
                            <textarea
                                id="description"
                                required
                                bind:value={description}
                                class="form-control"
                                rows="3"
                                placeholder="Beschreibung des Drills"
                            ></textarea>
                        </div>

                        <!-- Moves -->
                        <div class="mb-4">
                            <h3 class="h5 text-light fw-bold mb-3">
                                Moves ({moves.length})
                            </h3>

                            {#each moves as move, index}
                                <div
                                    class="card bg-secondary bg-opacity-25 mb-3 border-0"
                                >
                                    <div class="card-body">
                                        <div
                                            class="d-flex justify-content-between align-items-start mb-2"
                                        >
                                            <h4 class="h6 text-light mb-0">
                                                Move {index + 1}
                                            </h4>
                                            <span
                                                class="badge bg-primary rounded-pill"
                                            >
                                                {move.from} → {move.to}
                                            </span>
                                        </div>

                                        <div class="mb-3">
                                          
                                            <label
                                                for="instruction-{index}"
                                                class="form-label text-light small"
                                            >
                                                Anweisung
                                            </label>
                                            <textarea
                                                id="instruction-{index}"
                                                bind:value={move.instruction}
                                                class="form-control form-control-sm"
                                                rows="2"
                                                placeholder="Detaillierte Anweisungen für diesen Move..."
                                            ></textarea>
                                        </div>

                                        <div>
                                              <label
                                                for="label-{index}"
                                                class="form-label text-light small"
                                            >
                                                Label
                                            </label>
                                            <input
                                                id="label-{index}"
                                                type="text"
                                                bind:value={move.label}
                                                class="form-control form-control-sm"
                                                placeholder="z.B. 2x (optional)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>

                        <div class="d-grid gap-2">
                            <div class="form-check form-switch">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="visibility"
                                    bind:checked={isPublic}
                                />
                                <label
                                    class="form-check-label text-light"
                                    for="visibility"
                                >
                                    Öffentlich
                                </label>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="d-grid gap-2">
                            <button
                                type="submit"
                                disabled={isSaving}
                                class="btn btn-primary btn-lg rounded-pill"
                            >
                                {#if isSaving}
                                    <span
                                        class="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Speichern...
                                {:else}
                                    Änderungen speichern
                                {/if}
                            </button>

                            <button
                                on:click={(e) => handleDelete(e, data.drill.id)}
                                disabled={isDeleting}
                                class="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center mx-auto mt-3"
                                style="width: 48px; height: 48px;"
                                title="Drill löschen"
                            >
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
</style>
