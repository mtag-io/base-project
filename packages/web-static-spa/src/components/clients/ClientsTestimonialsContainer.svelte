<script>
    import Title from "../Title.svelte";
    export let title
</script>

<div>
    <Title>{title}</Title>
    <slot/>
</div>
