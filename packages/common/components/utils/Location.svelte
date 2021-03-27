<script>
    import {onDestroy, onMount} from 'svelte'
    import {MaterialApp} from 'svelte-materialify/src'
    import {globalHistory} from 'svelte-routing/src/history'

    export let currentPath = '/'

    let unsub

    onMount(() => {
        unsub = globalHistory.listen(({location}) => {
            $currentPath = location.pathname
        })
    })

    onDestroy(() => {
        unsub()
    })

</script>

<MaterialApp class="layout">
    <slot/>
</MaterialApp>