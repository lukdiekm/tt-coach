<script lang="ts">
    import TableDiagram from "$lib/components/TableDiagram.svelte";
    import type { Move } from "$lib/types/Move.js";
    import type { Drill } from "$lib/types/Drill.js";
    import { goto } from "$app/navigation";
    import fixtures from "$lib/fixtures.js";

    let drill: Drill = {
        id: 0,
        name: "",
        description: "",
        moves: [],
    };

    let progress = drill.moves.length - 1;
    let isRecording = true;

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

    function editMove(index: number, field: "instruction", value: string) {
        drill.moves = drill.moves.map((move, i) =>
            i === index ? { ...move, [field]: value } : move,
        );
    }

    async function saveDrill() {
        if (!drill.name) {
            alert("Please enter a name for the drill");
            return;
        }

        const response = await fetch(`${fixtures.API_URL}/api/drills`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(drill),
        });

        if (response.ok) {
            const saved = await response.json();
            goto(`/${saved.id}`);
        } else {
            alert("Failed to save drill");
        }
    }
</script>

<div class="flex flex-col h-screen gap-8 isolate p-4">
    <div class="h-auto mx-auto">
        <TableDiagram
            {drill}
            {progress}
            {isRecording}
            on:addMove={handleAddMove}
            showGrid={true}
            showGridText={false}
        />
    </div>

    <div class="flex flex-col gap-4">
        {#if drill.moves.length > 0}
            <div
                class="flex flex-col gap-2 max-h-[300px] overflow-y-auto p-4 rounded bg-gray-800/50 backdrop-blur-sm"
            >
                {#each drill.moves as move, i}
                    <div
                        class="flex flex-col gap-2 p-3 rounded bg-gray-800"
                    >
                        <div class="flex items-center gap-4">
                            <span class="text-lg" style="color: {move.color}"
                                >●</span
                            >
                            <span class="flex-1">{move.from} → {move.to}</span>
                            <button
                                class="p-1 text-2xl text-gray-400 rounded hover:bg-red-500/30 hover:text-red-500"
                                on:click={() => deleteMove(i)}>×</button
                            >
                        </div>
                        <textarea
                            value={move.instruction}
                            on:input={(e) =>
                                editMove(
                                    i,
                                    "instruction",
                                    e.currentTarget.value,
                                )}
                            placeholder="Short instruction"
                            class="w-full p-2 rounded bg-background-light text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        ></textarea>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-center text-gray-500 p-8">
                Click grid cells to record moves
            </p>
        {/if}
    </div>

    <div class="flex flex-col gap-6 max-w-2xl">
        <div>
            <label
                for="drill-name"
                class="block text-sm/6 font-semibold text-white"
                >Drill name</label
            >
            <div class="mt-2">
                <input
                    bind:value={drill.name}
                    id="drill-name"
                    type="text"
                    placeholder="Enter a name for your drill"
                    class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
            </div>
        </div>
        <div>
            <label
                for="drill-description"
                class="block text-sm/6 font-semibold text-white"
                >Description</label
            >
            <div class="mt-2">
                <textarea
                    bind:value={drill.description}
                    id="drill-description"
                    rows="3"
                    placeholder="Describe your drill"
                    class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                ></textarea>
            </div>
        </div>
        <div class="flex justify-end">
            <button
                on:click={saveDrill}
                class="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Save Drill
            </button>
        </div>
    </div>
</div>

<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background: #1e1e1e;
        color: white;
        padding: 2rem;
        gap: 2rem;
    }

    .form-section {
        display: flex;
        gap: 1rem;

        input,
        textarea {
            padding: 0.5rem;
            border: none;
            border-radius: 4px;
            background: #2d2d2d;
            color: white;

            &:focus {
                outline: 2px solid #0b4f9c;
            }
        }

        .drill-name {
            font-size: 1.2em;
            font-weight: bold;
            flex: 1;
        }

        .move-inputs {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            flex: 2;

            .move-instruction {
                width: 100%;
            }

            .move-description {
                width: 100%;
                min-height: 60px;
                resize: vertical;
            }
        }
    }

    .diagram-section {
        flex: 1;
        min-height: 0; // Prevent overflow
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .moves-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 300px;
        overflow-y: auto;
        padding: 1rem;
        border-radius: 4px;
        background: #2d2d2d;

        .move-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.75rem;
            border-radius: 4px;
            background: #3d3d3d;

            .move-header {
                display: flex;
                align-items: center;
                gap: 1rem;

                .move-dot {
                    font-size: 1.2em;
                }

                .move-path {
                    flex: 1;
                }

                .delete-button {
                    background: none;
                    border: none;
                    color: #666;
                    font-size: 1.5em;
                    cursor: pointer;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    line-height: 1;

                    &:hover {
                        background: #ff44445d;
                        color: #ff4444;
                    }
                }
            }

            .move-edit-instruction {
                width: 100%;
                padding: 0.5rem;
                border: none;
                border-radius: 4px;
                background: #2d2d2d;
                color: white;

                &:focus {
                    outline: 2px solid #0b4f9c;
                }
            }

            .move-edit-description {
                width: 100%;
                min-height: 60px;
                padding: 0.5rem;
                border: none;
                border-radius: 4px;
                background: #2d2d2d;
                color: white;
                resize: vertical;

                &:focus {
                    outline: 2px solid #0b4f9c;
                }
            }
        }
    }

    .empty-state {
        text-align: center;
        color: #666;
        padding: 2rem;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }

    .save-button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        background: #0b4f9c;
        color: white;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;

        &:hover {
            background: lighten(#0b4f9c, 10%);
        }

        &:disabled {
            background: #666;
            cursor: not-allowed;
        }
    }
</style>
