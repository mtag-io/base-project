<script>
    import VideoPlayer from 'svelte-video-player';

    export let poster
    export let source
    console.log(source && source)
    console.log(poster && poster)

</script>

<VideoPlayer {poster} {source} />;