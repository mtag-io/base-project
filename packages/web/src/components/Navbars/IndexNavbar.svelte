<script>
    import NavbarLogo from '../Logo/NavbarLogo.svelte'
    import CommonButton from "../Buttons/CommonButton.svelte";
    import {isAuth, user} from '../../stores/user.store.js'
    import {paths} from "../../routes";
    import CommonLinkButton from "../Buttons/CommonLinkButton.svelte";

    const cds = {email: "admin@test.com", password: "secretPass51"}
    const login = () => {
        if ($isAuth) user.signOut()
        else user.signIn(cds)
    }

</script>

<nav class="top-0 fixed flex justify-between z-50 w-full px-4 py-3 navbar-expand-md bg-white shadow">
    <NavbarLogo/>
    <div class="flex align-middle">
        <div class="{!$isAuth && 'hidden'} flex align-middle">
            <CommonLinkButton type="secondary" to="{paths.HOME}">Home</CommonLinkButton>
            <CommonLinkButton type="secondary" to="{paths.SOURCE}">Sources</CommonLinkButton>
        </div>
        <CommonButton type="primary" on:click={login}>
            {$isAuth ? 'LOGOUT' : 'LOGIN'}
        </CommonButton>
    </div>
</nav>
