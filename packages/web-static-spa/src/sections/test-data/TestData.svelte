<script>
    import props from 'static-props'
</script>
    <ul>
        {#each props as prop}
            <li>{prop.name}</li>
        {/each}
    </ul>
