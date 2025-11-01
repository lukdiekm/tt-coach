<script lang="ts">
    import type { PageData } from "./[id]/$types.js";
    import { goto } from "$app/navigation";
    import { DrillsAPI } from "$lib/api/drills.js";
    import type { Drill } from "$lib/types/Drill.js";
    import type { DrillCategory } from "$lib/types/DrillCategory.js";
    import { onMount } from "svelte";
    import { DrillCategoriesAPI } from "$lib/api/drillCategories.js";

    export let data: PageData;

    let name = data.drill.name;
    let description = data.drill.description;
    let is_public = data.drill.is_public;
    let moves = [...data.drill.moves];
    let isSaving = false;
    let errorMessage = "";
    let isDeleting = false;
    let categories: DrillCategory[] = [];
    let selectedCategoryId: number;

    onMount(async () => {
        try {
            categories = await DrillCategoriesAPI.list();
        } catch (error) {
            console.error("Failed to load categories:", error);
        }
    });

    async function handleSubmit() {
        isSaving = true;
        errorMessage = "";

        try {
            const updatedDrill: Partial<Drill> = {
                name,
                description,
                moves,
                is_public,
                drill_category_id: selectedCategoryId,
            };
            console.log(updatedDrill);
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

        if (!confirm("Möchtest du die Übung wirklich löschen?")) {
            return;
        }

        try {
            isDeleting = true;
            await DrillsAPI.delete(drillId);
            goto("/");
        } catch (error) {
            console.error("Failed to delete drill:", error);
            alert("Fehler beim Löschen der Übung");
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
                        <h2 class="h4 mb-0 text-light">Übung bearbeiten</h2>
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
                            <label for="name" class="form-label fw-bold">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                bind:value={name}
                                class="form-control form-control-lg bg-dark border-0"
                                placeholder="Name der Übung"
                            />
                        </div>

                        <!-- Drill Description -->
                        <div class="mb-4">
                            <label for="description" class="form-label fw-bold">
                                Beschreibung
                            </label>
                            <textarea
                                id="description"
                                bind:value={description}
                                class="form-control bg-dark border-0"
                                rows="3"
                                placeholder="Beschreibung der Übung"
                            ></textarea>
                        </div>

                        <!-- Moves -->
                        <div class="mb-4">
                            <h3 class="h5 fw-bold mb-3">
                                Schläge ({moves.length})
                            </h3>

                            {#each moves as move, index}
                                <div class="card bg-opacity-25 mb-3 border-0">
                                    <div class="card-body p-0">
                                        <div
                                            class="d-flex justify-content-between align-items-start mb-2"
                                        >
                                            <h4 class="h6 mb-0">
                                                Schlag {index + 1}
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
                                                class="form-control form-control-sm bg-dark border-0"
                                                rows="2"
                                                placeholder="Detaillierte Anweisungen für diesen Move..."
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label
                                                for="label-{index}"
                                                class="form-label small"
                                            >
                                                Hinweis
                                            </label>
                                            <input
                                                id="label-{index}"
                                                type="text"
                                                bind:value={move.label}
                                                class="form-control form-control-sm bg-dark border-0"
                                                placeholder="z.B. 2x (optional)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {#if index < moves.length - 1}
                                    <div class="text-center my-2">
                                        <i class="bi bi-arrow-down"></i>
                                    </div>
                                {/if}
                            {/each}
                        </div>

                        <div class="d-grid gap-2 mb-4">
                            <div class="form-check mb-4">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="visibility"
                                    bind:checked={is_public}
                                />
                                {is_public}
                                <label
                                    class="form-check-label text-light"
                                    for="visibility"
                                >
                                    Öffentlich
                                </label>
                            </div>

                            <label
                                for="drill-category"
                                class="form-label fw-semibold"
                            >
                                Kategorie
                            </label>
                            <select
                                bind:value={selectedCategoryId}
                                id="drill-category"
                                class="form-select bg-dark border-0"
                            >
                                {#each categories as category}
                                    <option value={category.id}>
                                        {category.name}
                                    </option>
                                {/each}
                            </select>
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
