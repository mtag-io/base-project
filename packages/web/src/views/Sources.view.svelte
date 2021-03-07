<script>
    import {onMount} from "svelte"
    import VideoPlayer from "svelte-video-player";
    import {getAuth} from "../lib/http";
    import {endpoints} from '../../__config__/endpoints.json'
    import {thumb_width as thumbWidth} from '../../__config__/worker.json'
    import {sources} from "../stores/sources.store";
    import {createStorage, sGet} from "../lib/utils";
    import {isAuth} from "../stores/user.store";

    let data
    let src
    let wdg

    onMount(async () => {
        if (sGet(sources)) return
        const res = await getAuth(endpoints.source)
        data = res['data']
        src = createStorage($isAuth)
        wdg = createStorage($isAuth, true)
    })
</script>


<div>
    {#if data}
        <div>
            {#each data.sources as source}
                <div style="width:400px">
                    <VideoPlayer
                            source="{[src(source.source)]}"
                            poster="{src(source['thumb'])}"/>
                    <div>{source.info.streams}</div>
                </div>
            {/each}
        </div>
    {/if}
</div>