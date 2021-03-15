<script>
  import {ClassBuilder} from "commloc/tailwind/classes";

  let classesDefault =
    "fixed top-0 w-full items-center flex-wrap flex left-0 z-30 px-4 py-2 h-16 shadow bg-primary";

  export let classes = classesDefault;

  const cb = new ClassBuilder(classes, classesDefault);

  $: c = cb.flush().add($$props['class']).get();
</script>

<header class={c}>
  <slot />
</header>
