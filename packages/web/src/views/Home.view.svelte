<script>
    import Button from 'components/Base/Button.svelte'
    import Dialog from "components/Base/Dialog.svelte";
    import Navbar from "../components/Navbar.svelte";
    import {auth} from '../globals'

    let opened = false;

</script>

<Dialog opened="{opened}">
    <h5 slot="title">What do you think?</h5>
    <div class="text-gray-700">I'm not sure about today's weather.</div>
    <div slot="actions">
        <Button text on:click={() => opened = false}>Disagree</Button>
        <Button text on:click={() => opened = false}>Agree</Button>
    </div>
</Dialog>

<div>
    <Navbar/>
    <h1 class="mt-16">Home</h1>
</div>