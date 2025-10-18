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
        background: gray;

        .diagram-section {
            height: 85%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .text-section {
            height: 15%;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background: rgba(0, 0, 0, 0.2);
            color: white;

            .instruction {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                flex: 1;
                gap: 0.5rem;
            }

            .controls {
                display: flex;
                justify-content: center;
                gap: 1rem;

                button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    background: #0B4F9C;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    
                    &:hover:not(:disabled) {
                        background: lighten(#0B4F9C, 10%);
                    }

                    &:disabled {
                        background: #6c757d;
                        cursor: not-allowed;
                        opacity: 0.7;
                    }
                }
            }
        }
    }
</style>