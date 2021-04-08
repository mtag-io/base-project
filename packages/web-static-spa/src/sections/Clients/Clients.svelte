<script>
    import ClientsContainer from "../../components/clients/ClientsContainer.svelte";
    import ClientsGallery from "../../components/clients/ClientsGallery.svelte";

    import {clientsDB} from "../../local-DB/clients";
    import CardContainer from "../../components/cards/CardContainer.svelte";


</script>

<ClientsContainer title={clientsDB.title} body={clientsDB.body}>
    <div slot="gallery">
        <CardContainer>
            <ClientsGallery gallery={clientsDB.gallery}/>
        </CardContainer>
    </div>

</ClientsContainer>



