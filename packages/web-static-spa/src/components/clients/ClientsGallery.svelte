<script>
    export let gallery

</script>

<div>
    {#each gallery as image}
        <div>
            <img src={image} alt="images"/>
        </div>
    {/each}
</div>
