<script>
    import {Route} from 'svelte-router-spa'
    import IndexNavbar from "../Navbar.svelte";
    import PageContainer from "./Page.container.svelte";
    import Footer from "../Footer/Footer.svelte";

    export let currentRoute
    const params = {}
</script>

<div class="app">
    <IndexNavbar/>
    <PageContainer>
        <Route {currentRoute} {params}/>
    </PageContainer>
    <Footer/>
</div>