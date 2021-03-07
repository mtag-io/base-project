<script>
    import {widgetType} from "../../constants/theme";

    export let type
    const typeStyle = type ? widgetType[type] : "primary"
</script>
<style>
    button:focus{
        outline: none !important;
    }
</style>
<button
        class="{typeStyle} hover:bg-primary-dark
        text-white px-4 py-2 shadow  outline-none
        border-transparent"
        on:click>
    <slot/>
</button>