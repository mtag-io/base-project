<script>
    import {Footer} from 'svelte-materialify/src'
    import Location from 'components/Location.svelte'
    import {currentPath} from '../../stores/index'
    import MainLayout from './MainLayout.svelte'
</script>
<Location>
    <MainLayout/>
    <!-- Page content slot -->
    <slot/>
    <!-- Page content slot -->
    <Footer>
        Footer content {$currentPath}
    </Footer>
</Location>