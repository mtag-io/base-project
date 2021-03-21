<script>
    import {onDestroy, onMount} from 'svelte'
    import {globalHistory} from 'svelte-routing/src/history'
    import {Route, Router} from 'svelte-routing'
    import MainLayout from './views/Layout.svelte'
    import {currentPath} from './stores'
    import {routes} from './routes'

    let unsub

    onMount(() => {
        unsub = globalHistory.listen(({location}) => {
            $currentPath = location.pathname
        })
    })

    onDestroy(() => {
        unsub()
    })

    export let url = ''
</script>

<style lang="scss" global>

    .min-slim{
      min-width: 400px;
      overflow: scroll;
    }

    body {
        @extend .min-slim;
    }
</style>

<Router url="{url}">
    <MainLayout>
        {#each routes as route}
            <Route path="{route.path}" component="{route.component}"/>
        {/each}
    </MainLayout>
</Router>



