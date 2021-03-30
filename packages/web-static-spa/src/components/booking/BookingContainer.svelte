<script>
    import Title from "../Title.svelte";
    import SubTitle from "../SubTitle.svelte";

    export let title
    export let subtitle
</script>

<div>
    <Title>{title}</Title>
    <SubTitle>{subtitle}</SubTitle>
    <slot name="booking"/>
</div>
