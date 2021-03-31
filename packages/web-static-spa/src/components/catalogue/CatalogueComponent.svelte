<script>
    import CatalogueAudioPlayer from "./CatalogueAudioPlayer.svelte";


    let audioTracks = [
        'https://sveltejs.github.io/assets/music/strauss.mp3',
        'https://sveltejs.github.io/assets/music/holst.mp3',
        'https://sveltejs.github.io/assets/music/satie.mp3'
    ]
</script>

<div>
    {#each audioTracks as src}
        <CatalogueAudioPlayer {src} />
    {/each}
</div>
