<script>
    import LogoImg from './LogoImg.svelte'
    import {appName} from '../../../__config__/global.json'
    import {ClassBuilder} from "commloc";
    import {X_SM} from "commloc/constants/named";

    let displayText = appName
    let color = 'primary'
    let size = ''
    let shrink = true
    let textClass = ''

    const classDefault = "flex items-center border-secondary border-2"
    const textClassesDefault = "font-bold text-2xl"
    let classes

    const tcb = new ClassBuilder(textClass, textClassesDefault);

    $: textClass = tcb
        .flush()
        .add(textClass, !!textClass)
        .add("hidden md:block", shrink)
        .get();

    const cb = new ClassBuilder(classes, classDefault)

    $: classes = cb
        .flush()
        .add($$props['class'])
        .get()

</script>

<div class="{classes}">
    <LogoImg size="{X_SM}"/>
    <span class="{textClass}">{displayText}</span>
</div>