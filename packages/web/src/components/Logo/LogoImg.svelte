<script>
    import {h, imgSize, MD, w} from "commloc";
    import {ClassBuilder} from "commloc/tailwind/classes.js";

    export let size;
    export let href = null;

    const classesDefault = 'relative ';

    export let classes = classesDefault;

    const cb = new ClassBuilder(classes, classesDefault);

    classes = cb
        .flush()
        .add(w(size), size, MD)
        .add(h(size), size, MD)
        .add($$props['class'])
        .get();

    console.log(imgSize(size || MD))

    const imgPath = `assets/img/logo${imgSize(size || MD)}.png`

</script>

{#if href}
    <a href="{href}">
        <img src="{imgPath}"
             class={classes}
             alt="app-logo"/>
    </a>
{:else}
    <img src="{imgPath}"
         class={classes}
         alt="app-logo"/>
{/if}