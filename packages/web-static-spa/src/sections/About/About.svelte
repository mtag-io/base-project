<script>
    import AboutCard from "../../components/cards/About/AboutCard.svelte"
    import CardContainer from "../../components/cards/CardContainer.svelte";

    //database
    import {aboutDB} from "../../local-DB/about"


</script>


<CardContainer>
    <AboutCard items={aboutDB}/>
</CardContainer>


