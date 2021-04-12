<script>
    import {Menu, Button, List, Icon} from 'svelte-materialify/src';
    import {mdiChevronDown} from '@mdi/js';
    import {slide} from 'svelte/transition';

    export let anchors = ['Home']

    let active = false;

    function toggle() {
        active = !active;
    }
</script>

<div class="flex-1 justify-center d-none d-sm-block">


    <Menu hover>
        <div slot="activator" transition:slide>
            <Button text fab
                    class="theme--light"
                    style="box-shadow: none; width: 100%; height: 100%; border-radius: 0; padding-right: 5px; padding-left: 10px;" on:click={toggle}>
                SECTIONS
                <Icon path={mdiChevronDown} rotate={active ? 180 : 0}/>
            </Button>
        </div>
        {#if active}
            <List>
                {#each anchors as anchor}
                    <a style="width: 100%" class="primary-text" href="{`#${anchor}`}">
                        <Button text class="primary-text">
                            {anchor.toUpperCase()}
                        </Button>
                    </a>
                {/each}
            </List>
        {/if}
    </Menu>

</div>

