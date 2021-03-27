<script>
    import {Button} from 'svelte-materialify/src'

    export let anchors = ['Home']
</script>


{#each anchors as anchor}
    <Button text block>
        <a href="{`#${anchor}`}">{anchor}</a></Button>
{/each}

