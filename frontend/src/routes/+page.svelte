<script lang="ts">
    import type { PageData } from "./$types.js";
    export let data: PageData;
</script>

<div class="flex flex-col h-screen gap-8 isolate p-4">
    <header>
        <div class="mt-6 flex max-w-md gap-x-4">
            <h1 class="flex-auto">Table Tennis Drills</h1>
            <a
                href="/new"
                class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >New</a
            >
        </div>
    </header>

    <ul role="list" class="divide-y divide-white/5">
        {#each data.drills as drill}
            <a href="/{drill.id}">
                <li class="flex justify-between gap-x-6 py-5">
                    <div class="flex min-w-0 gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm/6 font-semibold text-white">
                                {drill.name}
                            </p>
                            <p class="mt-1 truncate text-xs/5 text-gray-400">
                                {drill.description}
                            </p>
                        </div>
                    </div>
                    <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
                        <span
                            class="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 inset-ring inset-ring-indigo-400/30"
                            >{drill.moves.length} moves</span
                        >
                    </div>
                </li>
            </a>
        {/each}
    </ul>
</div>

<style lang="scss">
</style>
