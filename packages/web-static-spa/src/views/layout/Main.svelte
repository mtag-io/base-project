<script>
    import About from '../sections/About.svelte'
    import Clients from "../sections/Clients.svelte"


    //Databases
    import {aboutDB} from "../../local-DB/about"
    import {clientsDB} from "../../local-DB/clients"
    import {TestimonialsCLDB} from "../../local-DB/clients-testimonials"

    console.log(clientsDB)
    const poster = 'assets/logo/logo400.png'
    const source = ['target.mp4']
</script>

<div>
    <section id="home">
        <h1>Home page</h1>
        <h1>Home page</h1>
        <h1>Home page</h1>
        <h1>Home page</h1>
        <h1>Home page</h1>
        <h1>Home page</h1>
        <h1>Home page</h1>
        <h1>Home page</h1>
        <h1>Home page</h1>
    </section>

    <section id="about">
        <About items={aboutDB}/>
    </section>

    <section id="contact">

    </section>

    <section id="clients">
        <Clients clients={clientsDB}
                 titleT={TestimonialsCLDB}
                 items={TestimonialsCLDB}/>
    </section>

    <section id="catalogue">

    </section>
</div>

