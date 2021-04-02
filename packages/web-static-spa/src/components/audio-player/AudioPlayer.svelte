<script>
    import TrackHeading from './TrackHeading.svelte';
    import ProgressBarTime from './ProgressBarTime.svelte';
    import Controls from './Controls.svelte';
    import VolumeSlider from './VolumeSlider.svelte';
    import PlayList from './PlayList.svelte';

    import {onMount} from "svelte";

    let catalogues = [];
    let error = null

    onMount(async () => {
        const parseJSON = (resp) => (resp.json ? resp.json() : resp);
        const checkStatus = (resp) => {
            if (resp.status >= 200 && resp.status < 300) {
                return resp;
            }
            return parseJSON(resp).then((resp) => {
                throw resp;
            });
        };
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const res = await fetch("http://localhost:1337/catalogues", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(checkStatus)
                .then(parseJSON);
            catalogues = res
        } catch (e) {
            error = e
        }
    });


    // Get Audio track
    let trackIndex = 0;
    // $: console.log(trackIndex)
    let audioFile = new Audio(catalogues[trackIndex].audio);
    let trackTitle = catalogues[trackIndex].title;

    const loadTrack = () => {
        audioFile = new Audio(catalogues[trackIndex].audio);
        audioFile.onloadedmetadata = () => {
            totalTrackTime = audioFile.duration;
            updateTime();
        }
        trackTitle = catalogues[trackIndex].title;
    }

    const autoPlayNextTrack = () => {
        if (trackIndex <= catalogues.length-1) {
            trackIndex += 1;
            loadTrack();
            audioFile.play();
        } else {
            trackIndex = 0;
            loadTrack();
            audioFile.play();
        }
    }


    // Track Duration and Progress Bar
    let totalTrackTime;
    $: console.log(totalTrackTime)
    audioFile.onloadedmetadata = () => {
        totalTrackTime = audioFile.duration;
        updateTime();
    }

    let totalTimeDisplay = "loading...";
    let currTimeDisplay = "0:00:00";
    let progress = 0;
    let trackTimer;

    function updateTime() {
        progress = audioFile.currentTime * (100 / totalTrackTime);

        let currHrs = Math.floor((audioFile.currentTime / 60) / 60);
        let currMins = Math.floor(audioFile.currentTime / 60);
        let currSecs = Math.floor(audioFile.currentTime - currMins * 60);

        let durHrs = Math.floor( (totalTrackTime / 60) / 60 );
        let durMins = Math.floor( (totalTrackTime / 60) % 60 );
        let durSecs =  Math.floor(totalTrackTime - (durHrs*60*60) - (durMins * 60));

        if(currSecs < 10) currSecs = `0${currSecs}`;
        if(durSecs < 10) durSecs = `0${durSecs}`;
        if(currMins < 10) currMins = `0${currMins}`;
        if(durMins < 10) durMins = `0${durMins}`;

        currTimeDisplay = `${currHrs}:${currMins}:${currSecs}`;
        totalTimeDisplay = `${durHrs}:${durMins}:${durSecs}`;

        if (audioFile.ended) {
            toggleTimeRunning();
        }
    }

    const toggleTimeRunning = () => {
        if (audioFile.ended) {
            isPlaying = false;
            clearInterval(trackTimer);
            console.log(`Ended = ${audioFile.ended}`);
        } else {
            trackTimer = setInterval(updateTime, 100);
        }
    }


    // Controls
    let isPlaying = false;
    $: console.log(`isPlaying = ${isPlaying}`)

    const playPauseAudio = () => {
        if (audioFile.paused) {
            toggleTimeRunning()
            audioFile.play();
            isPlaying = true;
        } else {
            toggleTimeRunning()
            audioFile.pause();
            isPlaying = false;
        }
    }

    const rewindAudio = () => audioFile.currentTime -= 10;
    const forwardAudio = () => audioFile.currentTime += 10;

    // Volume Slider
    let vol = 50;
    const adjustVol = () => audioFile.volume = vol / 100;


    // Playlist
    const handleTrack = (e) => {
        if (!isPlaying) {
            trackIndex = Number(e.target.dataset.trackId);
            loadTrack();
            playPauseAudio(); // auto play
        } else {
            isPlaying = false;
            audioFile.pause();
            trackIndex = Number(e.target.dataset.trackId);
            loadTrack();
            playPauseAudio(); // auto play
        }
    }
</script>


<main>
    <section id="player-cont">

        <TrackHeading {trackTitle} />


        <ProgressBarTime {currTimeDisplay}
                         {totalTimeDisplay}
                         {progress} />

        <Controls {isPlaying}
                  on:rewind={rewindAudio}
                  on:playPause={playPauseAudio}
                  on:forward={forwardAudio} />

        <VolumeSlider bind:vol
                      on:input={adjustVol} />
    </section>

    <PlayList on:click={handleTrack} />
</main>


<style>
    main {
        width: 50vh;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0 20px 0;
        background-color: #ddd;
    }

    #player-cont {
        width: 300px;
        height: 200px;
        padding: .7rem 1.5rem 0;
        box-shadow: 0 0 5px black;
        background: #222;
        color: #bbb;
        border-radius: 5px 5px 0 0;
    }
</style>
