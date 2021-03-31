<script>
    const props = getStaticProps()
    console.log(props)
</script>

<ul>
    {#each props as prop}
        <li>{prop.name}</li>
    {/each}
</ul>