<script>
    import {About, Clients, Catalogue, Contact, BookingProcess, Home} from '../../sections/index'

    import {Container} from 'svelte-materialify/src';

    //Databases
    import {clientsDB} from "../../local-DB/clients"
    import {TestimonialsCLDB} from "../../local-DB/clients-testimonials"
    import Testimonials from "../../sections/Testimonials/Testimonials.svelte";
    import Title from "../Title.svelte";

    const poster = 'assets/logo/logo400.png'
    const source = ['target.mp4']
</script>

<div class="main">
    <section id="home">
        <Home/>
    </section>

    <section id="about">

        <div style="width: 100vh; border-radius: 2px; border-color: black" class="theme--light">
            <div style="margin-left: 24%; padding-bottom: 20px ;padding-top: 30px;">
                <Title>About</Title>
            </div>
        </div>
        <Container style="height: 100vh;padding-top: 50px; margin-bottom: 100px">
            <About/>
        </Container>
    </section>

    <section id="clients">
        <Container>
            <Clients clients={clientsDB}/>
        </Container>
    </section>

    <section id="testimonials">
        <Container>
            <Testimonials titleT={TestimonialsCLDB} items={TestimonialsCLDB}/>
        </Container>
    </section>

    <section id="catalogue">
        <Container>
            <Catalogue/>
        </Container>
    </section>

    <section id="booking process">
        <Container>
            <BookingProcess/>
        </Container>
    </section>

    <section id="contact">
        <Container>
            <Contact/>
        </Container>
    </section>
</div>

<style>
    @media only screen and (min-width: 950px) {
        :global(.s-container) {
            max-width: 1000px;
        }
    }
</style>
