<script>
    import {MaterialApp} from 'svelte-materialify/src'
    import Footer from 'ext-comp/footer/Footer.svelte'
    import Page from './Page.svelte'
    import Header from './Header.svelte'

    const params = {}
</script>

<MaterialApp>
    <Header/>
    <Page>
        <slot/>
    </Page>
    <Footer/>
</MaterialApp>
