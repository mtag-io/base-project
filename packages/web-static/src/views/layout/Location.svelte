<script>
    import {onDestroy, onMount} from 'svelte'
    import {MaterialApp} from 'svelte-materialify/src'
    import {globalHistory} from 'svelte-routing/src/history'
    import {currentPath} from '../../stores/index'

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