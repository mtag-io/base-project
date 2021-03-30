<script>
    import {MaterialApp} from 'svelte-materialify/src'

    import Page from './Page.svelte'
    import Header from './Header.svelte'
    import Footer from "../../components/footer/Footer.svelte";

    const params = {}
</script>

<MaterialApp>
    <Header/>
    <Page>
        <slot/>
    </Page>
    <Footer/>
</MaterialApp>
