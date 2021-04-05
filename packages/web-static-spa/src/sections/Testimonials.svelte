<script>
    import TestimonialsContainer from "../components/testimonials/TestimonialsContainer.svelte";

    import {testimonialsDB} from "../local-DB/testimonials";
    import TestimonialsComponent from "../components/testimonials/TestimonialsComponent.svelte";

</script>


<TestimonialsContainer title={testimonialsDB.title} body={testimonialsDB.body} address={testimonialsDB.address}>
    <div slot="testimonials">
      <TestimonialsComponent items={testimonialsDB.items}/>
    </div>
</TestimonialsContainer>
