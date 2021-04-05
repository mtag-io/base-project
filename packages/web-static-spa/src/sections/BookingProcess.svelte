<script>
    import BookingContainer from "../components/booking/BookingContainer.svelte";
    import BookingComponent from "../components/booking/BookingComponent.svelte";

    import {booking} from "../local-DB/booking";
</script>

<BookingContainer title={booking.title} subtitle={booking.subtitle}>
    <div slot="booking">
        <BookingComponent items={booking.items}/>
    </div>
</BookingContainer>
