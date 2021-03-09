<script>
    import {colors} from '../../../__config__/theme.json'
    import {sizeToRem} from "../../../__code__/utils";
    export let size = 'default';
    export let color = colors.primary.default;
    export let duration = "0.75s";

    const cssSize = sizeToRem(size)

</script>
<style>
    .circle {
        height: var(--size);
        width: var(--size);
        border-color: var(--color) transparent var(--color) var(--color);
        border-width: calc(var(--size) / 10);
        border-style: solid;
        border-image: initial;
        border-radius: 50%;
        animation: var(--duration) linear 0s infinite normal none running rotate;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
<div class="circle" style="--size: {cssSize}; --color: {color}; --duration: {duration}"></div>