<script>
    import TestimonialsContainer from "../../components/testimonials/TestimonialsContainer.svelte";

    import {testimonialsDB} from "../../local-DB/testimonials";
    import TestimonialsComponent from "../../components/testimonials/TestimonialsComponent.svelte";
    import ClientsTestimonialsContainer from "../../components/clients/ClientsTestimonialsContainer.svelte";
    import ClientsTestimonials from "../../components/clients/ClientsTestimonials.svelte";

    import {TestimonialsCLDB} from "../../local-DB/clients-testimonials";
    import CardContainer from "../../components/cards/CardContainer.svelte";
</script>


<div>
    <ClientsTestimonialsContainer title={TestimonialsCLDB.title}>
        <CardContainer>
            <ClientsTestimonials items={TestimonialsCLDB.items}/>
        </CardContainer>
    </ClientsTestimonialsContainer>

    <TestimonialsContainer title={testimonialsDB.title} body={testimonialsDB.body} address={testimonialsDB.address}>
        <div slot="testimonials">
            <TestimonialsComponent items={testimonialsDB.items}/>
        </div>
    </TestimonialsContainer>
</div>
