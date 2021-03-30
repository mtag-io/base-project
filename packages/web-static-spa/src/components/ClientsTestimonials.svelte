<script>
    export let items

</script>

<div>
    {#each items as item}
        <div>
            {item.body}
            <br/>
            {item.author}
        </div>
    {/each}
</div>
