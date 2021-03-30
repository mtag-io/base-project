<script>
    import Title from "../../components/Title.svelte";
    import TBody from "../../components/TBody.svelte";

    export let items
</script>

<div>
    {#each items as item}
        <Title>{item.title}</Title>
        <TBody>{item.body}</TBody>
    {/each}
</div>
