<script lang="ts">
    import TableDiagram from "$lib/components/TableDiagram.svelte";
    import type { PageData } from "./$types.js";

    export let data: PageData;

    export let progress: number = 0;
</script>

<div class="container">
    <div class="diagram-section">
        <TableDiagram drill={data.drill} {progress} />
    </div>
    <div class="text-section">
        <div class="instruction">
            <p>{data.drill.moves[progress].instruction}</p>
        </div>
        <div class="mt-6 flex max-w-md gap-x-4">
            <button
                on:click={() => progress--}
                disabled={progress === 0}
                type="submit"
                class="flex-1 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >Previous</button
            >
            <button
                on:click={() => progress++}
                disabled={progress === data.drill.moves.length - 1}
                type="submit"
                class="flex-1 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >Next</button
            >
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
        }
    }
</style>
