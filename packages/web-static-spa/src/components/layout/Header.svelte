<script>
    import {AppBar, Button, Icon, NavigationDrawer, Overlay} from 'svelte-materialify/src'
    import {mdiAccountCircle, mdiMenu} from '@mdi/js'
    import {appName} from 'config/global.json'
    import AppLogo from 'ext-comp/logo/AppLogo.svelte'
    import DrawerContent from './DrawerContent.svelte'
    import Menu from './Menu.svelte'


    let drawer = false

    const toggleDrawer = () => {
        drawer = !drawer
    }

    const close = () => {
        drawer = false
    }
    const anchor = [
        'about'
    ]
    const anchors = [
        'contact'
    ]
    const homeAnchors = [
        'clients',
        'testimonials',
        'catalogue',
        'booking process',
    ]
    const drawerAnchors = [
        'about',
        'clients',
        'testimonials',
        'catalogue',
        'booking process',
        'contact'
    ]

    export let height = '74px'
</script>

<AppBar absolute class=" theme--light s-app-bar s-app-bar__wrapper" style=" width: 100vw; " >

    <!--    DRAWER BUTTONS-->
    <div slot="icon" >
        <Button class="theme--light d-sm-none" fab depressed on:click={toggleDrawer}>
            <Icon path={mdiMenu}/>
        </Button>
    </div>

    <!--LOGO-->
    <span class="d-none d-sm-block">
        <a href="/" class="primary-text" style="font-size: 20px">
            <AppLogo/>
            <b>{appName}</b>
         </a>
    </span>
    <div style="flex-grow:1; display: flex; justify-content: center">
        <span class="d-sm-none ">
        <a href="/" class="primary-text">
            <AppLogo/>
         </a>
    </span>
    </div>

    <!--   BUTTONS AND MENUS-->
    <div class="d-none d-sm-block">
        <a class="theme--light primary-text d-flex" href="{`#${anchor}`}" style="flex-grow:1">
            <Button text style="color: black;">
                {anchor}
            </Button>
        </a>
    </div>
    <Menu anchors="{homeAnchors}"/>
    <div class="d-none d-sm-block">
        <a class="theme--light primary-text  d-flex " href="{`#${anchors}`}" style="flex-grow:1">
            <Button text style="color: black; margin-right: 15px;">
                {anchors}
            </Button>
        </a>
    </div>
    <Button class="primary-color d-none d-sm-block pr-2">
        <Icon path="{mdiAccountCircle}" class="mr-2"/>
        AUTH
    </Button>
    <Button icon class="primary-color d-sm-none pr-2">
        <Icon path="{mdiAccountCircle}"/>
    </Button>

</AppBar>
<div class="d-sm-none">
    <NavigationDrawer class="pt-16  s-navigation-drawer__content " fixed active="{drawer}">
        <DrawerContent anchors="{drawerAnchors}" {close}/>
    </NavigationDrawer>
    <Overlay active="{drawer}" absolute on:click={toggleDrawer} index={1}/>

</div>


<style lang="scss" global>
    .s-app-bar__wrapper {
      --s-app-bar-height: 74px;
    }
    .s-app-bar{
      height: 74px;
    }

</style>
