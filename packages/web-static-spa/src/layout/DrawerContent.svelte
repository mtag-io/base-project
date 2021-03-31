<script>
    import {ListItem} from 'svelte-materialify/src'

    export let anchors = ['Home']
    export let close = null
</script>

{#each anchors as anchor}
    <a href="{`#${anchor}`}">
        <ListItem on:click="{close}" link ripple>
            {anchor.toUpperCase()}
        </ListItem>
    </a>
{/each}

