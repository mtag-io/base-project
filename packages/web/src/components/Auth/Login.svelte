<script>
    let password = ""
    let email = ""

    const handleLogin = async () => {
        await
    }
</script>

<div>
    <h1>Sign In</h1>
    <form on:submit|preventDefault={handleLogin}>
        <label>
            Email:
            <input type="text" bind:value={email} placeholder="email address"/>
        </label>
        <label>
            Password:
            <input type="password" bind:value={password} />
        </label>
        <button type="submit">Login</button>
    </form>
</div>