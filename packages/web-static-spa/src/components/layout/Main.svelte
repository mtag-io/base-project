<script>
    import {About, Clients, Catalogue, Contact, BookingProcess, Home} from '../../sections/index'


    //Databases
    import {aboutDB} from "../../local-DB/about"
    import {clientsDB} from "../../local-DB/clients"
    import {TestimonialsCLDB} from "../../local-DB/clients-testimonials"

    const poster = 'assets/logo/logo400.png'
    const source = ['target.mp4']
</script>

<div class="main">
    <section id="home">
        <Home/>
    </section>

    <section id="about">
        <div class="container">
            <About items={aboutDB}/>
        </div>
    </section>

    <section id="clients">
        <div class="container">
            <Clients clients={clientsDB}
                     titleT={TestimonialsCLDB}
                     items={TestimonialsCLDB}/>
        </div>
    </section>

    <section id="catalogue">
        <div class="container">
            <Catalogue/>
        </div>
    </section>

    <section id="booking process">
        <div class="container">
            <BookingProcess/>
        </div>
    </section>

    <section id="contact">
        <div class="container">
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
        /*margin: 0 auto;*/

    }

</style>
