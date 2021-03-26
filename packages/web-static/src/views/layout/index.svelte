<script>
    import AuthNavbar from '../../components/Navbars/AuthNavbar.svelte'
    import Footer from '../../components/Footers/Footer.svelte'
    import PageContainer from '../../layout/Page.container.svelte'

    const params = {}
</script>

<div class="app">
    <AuthNavbar/>
    <PageContainer>
        <slot/>
    </PageContainer>
    <Footer/>
</div>
