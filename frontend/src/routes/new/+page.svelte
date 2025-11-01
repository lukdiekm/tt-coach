<script lang="ts">
    import TableDiagram from "$lib/components/TableDiagram.svelte";
    import type { Move } from "$lib/types/Move.js";
    import type { Drill } from "$lib/types/Drill.js";
    import type { DrillCategory } from "$lib/types/DrillCategory.js";
    import { goto } from "$app/navigation";
    import { DrillsAPI } from "$lib/api/drills.js";
    import { DrillCategoriesAPI } from "$lib/api/drillCategories.js";
    import { onMount } from "svelte";

    let drill: Drill = {
        id: 0,
        name: "",
        description: "",
        moves: [],
        isPublic: false,
    };

    let categories: DrillCategory[] = [];
    let selectedCategoryId: number | null = null;
    let progress = drill.moves.length - 1;
    let isRecording = true;

    onMount(async () => {
        try {
            categories = await DrillCategoriesAPI.list();
        } catch (error) {
            console.error("Failed to load categories:", error);
        }
    });

    async function handleAddMove(event: CustomEvent<{ move: Move }>) {
        const move = {
            ...event.detail.move,
            color: event.detail.move.color,
        };

        drill.moves = [...drill.moves, move];
        progress = drill.moves.length - 1;
    }

    function deleteMove(index: number) {
        drill.moves = drill.moves.filter((_, i) => i !== index);
        progress = drill.moves.length - 1;
    }

    function editMove(
        index: number,
        field: "instruction" | "label",
        value: string,
    ) {
        drill.moves = drill.moves.map((move, i) =>
            i === index ? { ...move, [field]: value } : move,
        );
    }

    async function saveDrill() {
        if (!drill.name) {
            alert("Please enter a name for the drill");
            return;
        }

        try {
            drill.drill_category_id = selectedCategoryId ?? undefined;
            const saved = await DrillsAPI.create(drill);

            goto(`/${saved.id}`);
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "Not authenticated"
            ) {
                goto("/login");
            } else {
                alert("Failed to save drill");
            }
        }
    }
</script>

<div class="container-fluid p-4 min-vh-100">
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
            <div class="mb-3">
                <a href="/" class="btn btn-primary">
                    <i class="bi bi-arrow-left"></i>
                </a>
            </div>

            <div class="mx-auto mb-4">
                <TableDiagram
                    {drill}
                    {progress}
                    {isRecording}
                    on:addMove={handleAddMove}
                    showGrid={true}
                    showGridText={false}
                />
            </div>
            <div class="bg-dark bg-opacity-50 card">
        <div class=" card-body p-4">
            <div class="mb-4">
                {#if drill.moves.length > 0}
                    <div class="overflow-auto" style="max-height: 300px;">
                        {#each drill.moves as move, index}
                            <div class="card mb-2">
                                <div class="card-body p-0">
                                    <div
                                        class="d-flex align-items-center gap-3 mb-2"
                                    >
                                        <span
                                            class="fs-5"
                                            style="color: {move.color}">●</span
                                        >
                                        <span class="flex-grow-1"
                                            >{move.from} → {move.to}</span
                                        >
                                        <button
                                            class="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                                            style="width: 32px; height: 32px; padding: 0;"
                                            on:click={() => deleteMove(index)}
                                            title="Schlag löschen"
                                        >
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>

                                    <textarea
                                        value={move.instruction}
                                        on:input={(e) =>
                                            editMove(
                                                index,
                                                "instruction",
                                                e.currentTarget.value,
                                            )}
                                        placeholder="Anweisung"
                                        class="form-control form-control-sm mb-2 bg-dark border-0"
                                    ></textarea>
                                    <input
                                        type="text"
                                        value={move.label}
                                        on:input={(e) =>
                                            editMove(
                                                index,
                                                "label",
                                                e.currentTarget.value,
                                            )}
                                        placeholder="Hinweis (wird im Diagramm angezeigt)"
                                        class="form-control form-control-sm bg-dark border-0"
                                    />
                                </div>
                            </div>
                            {#if index < drill.moves.length - 1}
                                <div class="text-center my-2">
                                    <i class="bi bi-arrow-down"></i>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {:else}
                    <p class="text-center text-muted p-4">
                        Klicke auf die Zellen im Raster, um Schläge
                        aufzuzeichnen
                    </p>
                {/if}
            </div>

            <div class="row g-3" style="max-width: 800px;">
                <div class="col-12">
                    <label for="drill-name" class="form-label fw-semibold"
                        >Name der Übung</label
                    >
                    <input
                        bind:value={drill.name}
                        id="drill-name"
                        type="text"
                        placeholder="Gib einen Namen für deine Übung ein"
                        class="form-control bg-dark border-0"
                    />
                </div>
                <div class="col-12">
                    <label
                        for="drill-description"
                        class="form-label fw-semibold">Beschreibung</label
                    >
                    <textarea
                        bind:value={drill.description}
                        id="drill-description"
                        rows="3"
                        placeholder="Beschreibe deine Übung, was sie beinhaltet oder wie sie ausgeführt werden soll"
                        class="form-control bg-dark border-0"
                    ></textarea>
                </div>
                <div class="col-12">
                    <label for="drill-category" class="form-label fw-semibold">
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
                <div class="col-12">
                    <button on:click={saveDrill} class="btn btn-primary w-100">
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
</div>
