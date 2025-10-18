<script lang="ts">
    import type { PageData } from './$types.js';
    export let data: PageData;
</script>

<div class="container">
    <ul>
        {#each data.drills as drill}
            <li>
                <a href="/{drill.id}">
                    {drill.name}
                </a>
            </li>
        {/each}
    </ul>
</div>
<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 2rem;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            
            li {
                margin-bottom: 1rem;
                
                a {
                    display: block;
                    padding: 1rem;
                    background: #0B4F9C;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.2s;
                    
                    &:hover {
                        background: lighten(#0B4F9C, 10%);
                    }
                }
            }
        }
    }
</style>
