<script context="module">
    export async function preload(){
        const response = await fetch('http://localhost:1337/test-data')
        const data =  await response.json()
        return data
    }
</script>

<div>
    <section id="home">
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
        <h1>Home</h1>
    </section>
    <section id="about">
        <h1>About page</h1>
        <h1>About page</h1>
        <h1>About page</h1>
        <h1>About page</h1>
        <h1>About page</h1>
        <h1>About page</h1>
        <h1>About page</h1>
        <h1>About page</h1>
        <h1>About page</h1>
    </section>
</div>

