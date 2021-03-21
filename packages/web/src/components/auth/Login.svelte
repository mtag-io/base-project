<script>
    import {Button, Card, CardText, Icon, TextField} from 'svelte-materialify/src'
    import {mdiEye, mdiEyeOff} from '@mdi/js'

    import DialogTitle from '../dialog/DialogTitle.svelte'
    import AppLogo from '../Logo/AppLogo.svelte'
    import {socialLogins} from './social'
    import {signinSchema, signupSchema} from './login.schema'
    import {socialProviders} from 'config/auth.json'

    const appLogo = 'assets/img/logo50.png'
    export let close

    let show = false
    let remember = false
    let signup = false

    const authDto = {
        email: '',
        password: '',
        passwordConfirm: ''
    }

    let errors = {}

    const extractErrors = ({inner}) => {
        return inner.reduce((acc, err) => {
            return {...acc, [err.path]: err.message}
        }, {})
    }

    const submitHandler = async () => {
        const schema = signup ? signupSchema : signinSchema
        try {
            await schema.validate(authDto, {abortEarly: false})
            alert(JSON.stringify(authDto, null, 2))
            errors = {}
        } catch (err) {
            errors = extractErrors(err)
            console.log(errors)
        }
    }
</script>

<Card class="min-slim">
    <DialogTitle class="primary-color white-text " {close}>
        Authentication
    </DialogTitle>
    <CardText class="mt-4">
        <div style="text-align: center">
            <AppLogo size="{40}" class="primary-color"/>
        </div>
        <form class="mt-4" on:submit|preventDefault={submitHandler}>
            <div class="d-flex justify-space-around mt-8 mb-8">
                {#each socialProviders as social}
                    <svelte:component this={socialLogins[social]} />
                {/each}
            </div>
            <TextField bind:value="{authDto.email}">Email</TextField>
            <TextField bind:value="{authDto.password}" class="mt-4" type={show ? 'text' : 'password'}>
                Password
                <div slot="append"
                     on:click={() => {show = !show}}>
                    <Icon path={show ? mdiEyeOff : mdiEye}/>
                </div>
            </TextField>
            {#if signup}
                <TextField
                        bind:value="{authDto.passwordConfirm}"
                        class="mt-4"
                        type={show ? 'text' : 'password'}>
                    Confirm password
                </TextField>
            {/if}
            <Button type="submit" block class="primary-color mt-8">
                {signup ? 'Sign Up' : 'Login'}
            </Button>
            <div class="mt-8 d-flex justify-space-between">
                <Button on:click="{()=> {signup=!signup}}" outlined text>
                    {signup ? 'Login' : 'Sign up'}
                </Button>
                <Button outlined text>Forgot Password</Button>
            </div>
        </form>
    </CardText>
</Card>