<script>
    import {
        AppBar,
        Button,
        Divider,
        Icon,
        ListItem,
        Menu,
        Dialog,
        NavigationDrawer,
        Overlay
    } from 'svelte-materialify/src'
    import {Link} from 'svelte-routing'
    import {appName} from 'config/global.json'
    import SuperAvatar from 'components/SuperAvatar.svelte'
    import AppLogo from 'components/logo/AppLogo.svelte'
    import Login from 'components/auth/Login.svelte'
    import {mdiMenu, mdiMenuDown} from '@mdi/js'

    let drawer = false
    let menu = false
    let login = false

    let isAuth = false

    const toggleDrawer = () => {
        drawer = !drawer
    }

    const toggleMenu = () => {
        menu = !menu
    }

    const open = () => {
        login = true
    }

    const close = () => {
        login = false
    }
</script>

<AppBar class="primary-color pr-3">
    <div slot="icon">
        <Button class="d-sm-none primary-color" fab depressed on:click={toggleDrawer}>
            <Icon path={mdiMenu}/>
        </Button>
    </div>
    <span slot="title" class="d-none d-sm-block white-text">
             <AppLogo/>
            <b>{appName}</b>
        </span>
    <div style="flex-grow:1"></div>
    {#if isAuth}
        <Menu right>
            <div slot="activator">
                <div class="white-text">
                    <Icon class="white-text" path="{mdiMenuDown}"/>
                    <SuperAvatar/>
                </div>
            </div>
            <ListItem>
                <Link to="/about">About</Link>
            </ListItem>
            <ListItem>
                <Link to="/">Home</Link>
            </ListItem>
            <Divider/>
            <ListItem>Sign out</ListItem>
        </Menu>
        <NavigationDrawer style="position: relative" active="{drawer}">Content</NavigationDrawer>
        <Overlay active="{drawer}" absolute on:click={toggleDrawer} index={1}/>
    {:else}
        <Button on:click="{open}" class="primary-color">Login</Button>
    {/if}
</AppBar>
<Dialog persistent active="{login}">
    <Login close="{() => {login = false}}"/>
</Dialog>

