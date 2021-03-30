<script>
    import Title from "./Title.svelte";
    import TBody from "./TBody.svelte";

    export let title
    export let body
</script>

<div>
    <Title>{title}</Title>
    <TBody>{body}</TBody>
    <slot name="gallery"/>
    <slot name="testimonials"/>
</div>

