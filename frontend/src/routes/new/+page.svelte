<script lang="ts">
    import TableDiagram from "$lib/components/TableDiagram.svelte";
    import type { Move } from "$lib/types/Move.js";
    import type { Drill } from "$lib/types/Drill.js";
    import { goto } from "$app/navigation";

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

        const response = await fetch("http://127.0.0.1:8000/api/drills", {
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

<div class="container">
    <div class="form-section">
        <input
            type="text"
            bind:value={drill.name}
            placeholder="Drill Name"
            class="drill-name"
        />
        <div class="move-inputs">
            <textarea
                bind:value={drill.description}
                placeholder="Description"
                class="description"
            ></textarea>
        </div>
    </div>
    <div class="diagram-section">
        <TableDiagram
            {drill}
            {progress}
            {isRecording}
            on:addMove={handleAddMove}
            showGrid={true}
            showGridText={false}
        />
    </div>
    <div class="controls">
        {#if drill.moves.length > 0}
            <div class="moves-list">
                {#each drill.moves as move, i}
                    <div class="move-item">
                        <div class="move-header">
                            <span class="move-dot" style="color: {move.color}"
                                >●</span
                            >
                            <span class="move-path"
                                >{move.from} → {move.to}</span
                            >
                            <button
                                class="delete-button"
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
                            class="move-edit-instruction"
                        ></textarea>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="empty-state">Click grid cells to record moves</p>
        {/if}
        <div class="buttons">
            <button class="save-button" on:click={saveDrill}>Save Drill</button>
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
