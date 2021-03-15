<script>
    import Logo from './Logo/Logo.svelte'
    import Button from "./Base/Button.svelte";
    import AppBar from "./Base/AppBar.svelte";
    import {auth} from '../globals'
    import {paths} from "../routing/route-paths";

    const cds = {email: "admin@test.com", password: "secretPass51"}
    const login = () => {
    }

</script>

<AppBar>
    <Logo/>
    <div class="flex align-middle">
        <div class="{auth.isAuth && 'hidden'} flex align-middle">
            <Button color="primary" href="{paths.HOME}">Home</Button>
            <Button color="primary" href="{paths.SOURCE}">Sources</Button>
        </div>
        <Button type="primary" on:click={login}>
            {auth.isAuth ? 'LOGOUT' : 'LOGIN'}
        </Button>
    </div>
</AppBar>
