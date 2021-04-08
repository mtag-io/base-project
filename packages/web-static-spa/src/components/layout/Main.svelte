<script>
    import {About, Clients, Catalogue, Contact, BookingProcess, Home} from '../../sections/index'


    //Databases
    import {clientsDB} from "../../local-DB/clients"
    import {TestimonialsCLDB} from "../../local-DB/clients-testimonials"
    import Testimonials from "../../sections/Testimonials/Testimonials.svelte";

    const poster = 'assets/logo/logo400.png'
    const source = ['target.mp4']
</script>

<div class="main">
    <section id="home">
        <Home/>
    </section>

    <section id="about">
        <div class="s-container">
            <About/>
        </div>
    </section>

    <section id="clients">
        <div class="s-container">
            <Clients clients={clientsDB}/>
        </div>
    </section>

    <section id="testimonials">
        <div class="s-container">
            <Testimonials   titleT={TestimonialsCLDB}
                            items={TestimonialsCLDB}/>
        </div>
    </section>

    <section id="catalogue">
        <div class="s-container">
            <Catalogue/>
        </div>
    </section>

    <section id="booking process">
        <div class="s-container">
            <BookingProcess/>
        </div>
    </section>

    <section id="contact">
        <div class="s-container">
            <Contact/>
        </div>
    </section>
</div>

<style>
    section{
        padding-top: 94px;
        padding-bottom: 40px;
    }
    .container {
        text-align: center;
        justify-content: center;
        width: 85%;
        max-width: 65em;
        height: 100%;
    }

</style>
