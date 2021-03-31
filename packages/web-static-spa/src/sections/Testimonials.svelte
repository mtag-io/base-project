<script>
    import TestimonialsContainer from "../components/testimonials/TestimonialsContainer.svelte";

    import {testimonialsDB} from "../local-DB/testimonials";
    import Testimonials from "../components/testimonials/Testimonials.svelte";

</script>


<TestimonialsContainer title={testimonialsDB.title} body={testimonialsDB.body} address={testimonialsDB.address}>
    <div slot="testimonials">
      <Testimonials items={testimonialsDB.items}/>
    </div>
</TestimonialsContainer>
