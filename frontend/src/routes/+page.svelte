<script lang="ts">
    import type { PageData } from './$types.js';
    export let data: PageData;
</script>

<div class="container">
    <header>
        <h1>Table Tennis Drills</h1>
        <a href="/new" class="new-drill-button">New Drill</a>
    </header>
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
        background: #1e1e1e;
        color: white;

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;

            h1 {
                margin: 0;
                font-size: 2rem;
            }
        }

        .new-drill-button {
            padding: 0.75rem 1.5rem;
            background: #2d9c0b;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            transition: background-color 0.2s;

            &:hover {
                background: lighten(#2d9c0b, 10%);
            }
        }

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
