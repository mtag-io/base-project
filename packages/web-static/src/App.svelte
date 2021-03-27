<script>
    import {Route, Router} from 'svelte-routing'
    import {routes} from './routes'
    import Location from '../../web-app/src/views/layouts/Location.svelte'

    export let url = ''
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
    <Location>
        <!--    <Layout>-->
        {#each routes as route}
            <Route path="{route.path}">
                {#if route.isError}
                    <svelte:component this="{route.component}" error="{route.isError}"/>
                {:else}
                    <svelte:component this="{route.component}"/>
                {/if}
            </Route>
        {/each}
    </Location>
    <!--    </Layout>-->
</Router>




