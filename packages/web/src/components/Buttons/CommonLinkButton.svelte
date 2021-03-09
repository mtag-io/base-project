<script>
    import {widgetType} from "../../constants/theme";

    export let to
    export let type
    const typeStyle = type ? widgetType[type] : "primary"
</script>
<style>
    button:focus {
        outline: none !important;
    }

    a {
        text-decoration: none;
    }
</style>

<a class="{typeStyle} text-white px-4 py-2 shadow outline-none border-transparent"
   href="{to}">
    <slot/>
</a>