<script>
    import {Footer} from 'svelte-materialify/src'
    import {Link} from 'svelte-routing'
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
        <Link to="/about">About</Link>
        <Link to="/error404">Error</Link>
        Footer content {$currentPath}
    </Footer>
</Location>