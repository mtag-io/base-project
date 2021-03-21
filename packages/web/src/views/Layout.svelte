<script>
    import {Footer, MaterialApp} from 'svelte-materialify/src'
    import {currentPath} from '../stores'
    import MainLayout from './MainLayout.svelte'
</script>

<MaterialApp class="layout">

        <MainLayout/>
        <!-- Page content slot -->

        <slot/>

        <!-- Page content slot -->
        <Footer>
            Footer content {$currentPath}
        </Footer>
</MaterialApp>