<script>
    import {Route, Router} from 'svelte-routing'
    import {routes} from './routes'
    import Layout from 'views/layout/Layout.svelte'
    import Location from 'ext-comp/utils/Location.svelte'
    import {currentPath} from './stores'

    export let url = ''
</script>

<style lang="scss" global>

  .min-slim {
    min-width: 400px;
    overflow: scroll;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    @extend .min-slim;
    scroll-behavior: smooth;
  }
</style>


<Router url="{url}">
    <Location {currentPath}>
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
    </Location>
</Router>




