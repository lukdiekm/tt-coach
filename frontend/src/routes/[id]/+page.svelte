<script lang="ts">
    import TableDiagram from "$lib/components/TableDiagram.svelte";
    import type { PageData } from './$types.js';

    export let data: PageData;

    export let progress: number = 0;
</script>

<div class="container">
    <div class="diagram-section">
        <TableDiagram drill={data.drill} progress={progress} />
    </div>
    <div class="text-section">
        <div class="instruction">
            <p>{data.drill.moves[progress].instruction}</p>
        </div>
        <div class="controls">
            <button 
                on:click={() => progress--}
                disabled={progress === 0}>
                Previous Move
            </button>
            <button 
                on:click={() => progress++}
                disabled={progress === data.drill.moves.length - 1}>
                Next Move
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

        .diagram-section {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        .text-section {
            padding: 1rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background: #2d2d2d;
            color: white;

            .instruction {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                font-size: 1.2em;
            }

            .controls {
                display: flex;
                justify-content: center;
                gap: 1rem;

                button {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 4px;
                    background: #0B4F9C;
                    color: white;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.2s;
                    
                    &:hover:not(:disabled) {
                        background: lighten(#0B4F9C, 10%);
                    }

                    &:disabled {
                        background: #666;
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
</style>