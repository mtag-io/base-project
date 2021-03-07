<script>
    import { fade } from 'svelte/transition';
</script>

<section in:fade>
    <slot />
</section>