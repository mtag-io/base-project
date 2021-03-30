<script>
    import {Avatar} from 'svelte-materialify/src'
    import {docRoot} from 'config/global.json'
    import {roundSize} from '../../sizes.helpers'

    const {logo, logoSizes} = docRoot

    let klass = ''
    export {klass as class}
    export let size = 32

    const appLogo = `${logo}/logo${roundSize(size, logoSizes)}.png`
</script>

<Avatar class="{klass}" {size}>
    <img src="{appLogo}" alt="app-logo"/>
</Avatar>