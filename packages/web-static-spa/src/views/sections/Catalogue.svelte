<script>
    import CatalogueContainer from "../../components/catalogue/CatalogueContainer.svelte";
    import AudioPlayer from "../../components/audio-player/AudioPlayer.svelte";


</script>

<div>
    <CatalogueContainer>
        <div slot="audio-player">
            <AudioPlayer/>
        </div>
    </CatalogueContainer>
</div>
