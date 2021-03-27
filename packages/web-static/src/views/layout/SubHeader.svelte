<script>
    import {Button} from 'svelte-materialify/src'
    export let anchors = ['Home']
</script>

<div class="white d-none d-sm-flex justify-space-around">
    {#each anchors as anc}
        <Button text class="primary-text" style="flex-grow:1">
            <a href="{`#${anc}`}">
                {anc.toUpperCase()}
            </a>
        </Button>
    {/each}
</div>