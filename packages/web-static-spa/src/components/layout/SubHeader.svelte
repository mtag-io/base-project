<script>
    import {Button} from 'svelte-materialify/src'

    export let anchors = ['Home']
</script>

<div class="white d-none d-sm-flex justify-space-around">
    {#each anchors as anchor}
        <a class="primary-text d-flex" href="{`#${anchor}`}" style="flex-grow:1">
            <Button text class="primary-text" style="flex-grow:1">

                {anchor.toUpperCase()}

            </Button>
        </a>
    {/each}
</div>