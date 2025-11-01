<script lang="ts">
    import TableDiagram from "$lib/components/TableDiagram.svelte";
    import type { PageData } from "./$types.js";

    export let data: PageData;

    export let progress: number = 0;
</script>

<div class="container-fluid p-4 min-vh-100">
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
            <header>
                <div
                    class="mt-3 mb-4 d-flex justify-content-between align-items-center"
                >
                    <a href="/" class="btn btn-primary">
                        <i class="bi bi-arrow-left"></i>
                    </a>
                    <a href="/{data.drill.id}/edit" class="btn btn-primary">
                        <i class="bi bi-pencil"></i>
                    </a>
                </div>
            </header>
            <div class="diagram-section mb-4">
                <TableDiagram drill={data.drill} {progress} />
            </div>
            <div class="text-section">
                <div class="card bg-dark mb-3">
                    <div class="card-body">
                        <p class="mb-0">{data.drill.moves[progress].instruction}</p>
                    </div>
                </div>
                <div class="d-flex gap-3" style="max-width: 500px;">
                    <button
                        on:click={() => progress--}
                        disabled={progress === 0}
                        type="button"
                        class="btn btn-primary flex-fill"
                    >
                        <i class="bi bi-arrow-left"></i>
                    </button>
                    <button
                        on:click={() => progress++}
                        disabled={progress === data.drill.moves.length - 1}
                        type="button"
                        class="btn btn-primary flex-fill"
                    >
                        <i class="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
</style>
