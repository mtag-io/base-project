<script>
    import {CardTitle, Icon, Button} from 'svelte-materialify/src'
    import {mdiClose} from '@mdi/js'

    let klass = ''
    export {klass as class}
    export let style = null
    export let close

</script>

<style lang="scss" global>
    .dialog-title{
      display: flex;
      text-transform: uppercase;
      justify-content: space-between;
      align-items: center;
    }
</style>

<CardTitle class="dialog-title {klass}" {style}>
    <slot/>
    <Button icon on:click={close}>
        <Icon path={mdiClose} />
    </Button>
</CardTitle>