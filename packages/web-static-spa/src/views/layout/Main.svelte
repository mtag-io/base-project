<script>
    import About from '../sections/About.svelte'
    import Clients from "../sections/Clients.svelte"


    //Databases
    import {aboutDB} from "../../local-DB/about"
    import {clientsDB} from "../../local-DB/clients"
    import {TestimonialsCLDB} from "../../local-DB/clients-testimonials"
    import BookingProcess from "../sections/BookingProcess.svelte";
    //import ContactComponent from "../../components/contact/ContactComponent.svelte";
    import Contact from "../sections/Contact.svelte";
    import Catalogue from "../sections/Catalogue.svelte";

    console.log(clientsDB)
    const poster = 'assets/logo/logo400.png'
    const source = ['target.mp4']
</script>

<div>
    <section id="home" class="mt-32">

        <h1>Home</h1>
<!--        <audio controls autoplay>-->
<!--            <source src="media/galileio_bf9b18c86e.wav" type="audio/wav">-->
<!--            Your browser does not support the audio element.-->
<!--        </audio>-->
    </section>

    <section id="about">
        <About items={aboutDB}/>
    </section>

    <section id="clients">
        <Clients clients={clientsDB}
                 titleT={TestimonialsCLDB}
                 items={TestimonialsCLDB}/>
    </section>

    <section id="catalogue">
        <Catalogue/>
    </section>

    <section id="booking process">
        <BookingProcess/>
    </section>

    <section id="contact">
        <Contact/>
    </section>
</div>

