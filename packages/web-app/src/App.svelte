<script>
    import {Route, Router} from 'svelte-routing'
    import Layout from './views/layouts/Layout.svelte'
    import {routes} from './routes'

    export let url = ''

    console.log(routes.map(
        r => {
            console.log(r)
            console.log('path: ', r.path)
            console.log('component: ', r.component)
            console.log('isError: ', r.isError, '\n')
        }
    ))
</script>

<style lang="scss" global>

  .min-slim {
    min-width: 400px;
    overflow: scroll;
  }

  body {
    @extend .min-slim;
  }
</style>


<Router url="{url}">
    <Layout>
        {#each routes as route}
            <Route path="{route.path}">
                {#if route.isError}
                    <svelte:component this="{route.component}" error="{route.isError}"/>
                {:else}
                    <svelte:component this="{route.component}"/>
                {/if}
            </Route>
        {/each}
    </Layout>
</Router>



