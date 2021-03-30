<script>
    import ClientsContainer from "../../components/clients/ClientsContainer.svelte";
    import ClientsGallery from "../../components/clients/ClientsGallery.svelte";
    import ClientsTestimonials from "../../components/clients/ClientsTestimonials.svelte";

    import {clientsDB} from "../../local-DB/clients";
    import {TestimonialsCLDB} from "../../local-DB/clients-testimonials";

    import ClientsTestimonialsContainer from "../../components/clients/ClientsTestimonialsContainer.svelte";
    import Testimonials from "./Testimonials.svelte";

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
    <Testimonials/>
</ClientsContainer>



