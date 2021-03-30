<script>
    import ClientsContainer from "../../components/ClientsContainer.svelte";
    import ClientsGallery from "../../components/ClientsGallery.svelte";
    import ClientsTestimonials from "../../components/ClientsTestimonials.svelte";

    import {clientsDB} from "../../local-DB/clients";
    import {TestimonialsCLDB} from "../../local-DB/clients-testimonials";
    import ClientsTestimonialsContainer from "../../components/ClientsTestimonialsContainer.svelte";
</script>

<ClientsContainer title={clientsDB.title} body={clientsDB.body}>
    <div slot="gallery">
        <ClientsGallery gallery={clientsDB.gallery}/>
    </div>

    <div slot="testimonials">
        <ClientsTestimonialsContainer title={TestimonialsCLDB.title}>
            <ClientsTestimonials items={TestimonialsCLDB.items}/>
        </ClientsTestimonialsContainer>
    </div>
</ClientsContainer>



