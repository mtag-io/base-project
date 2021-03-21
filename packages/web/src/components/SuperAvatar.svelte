<script>
    import {Avatar, Icon} from 'svelte-materialify/src'
    import {mdiAccountCircle} from '@mdi/js'
    import {createInitials} from 'commloc'

    let size = 36
    let img = ''
    let info = ''
    let klass = '';
    export { klass as class };
</script>


<Avatar {size} class="{klass}">
    {#if img}
        <img src="{img}" alt="avatar"/>
    {:else if info}
        <b>{createInitials(info)}</b>
    {:else}
        <Icon path={mdiAccountCircle}/>
    {/if}
</Avatar>