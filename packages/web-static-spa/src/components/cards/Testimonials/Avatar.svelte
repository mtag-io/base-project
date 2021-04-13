<script>
    import {Avatar} from 'svelte-materialify/src';

    export let avatar
</script>


<div class="container">
    <div class="avatar">
        <Avatar size="85px">
            <img src="https://imgur.com/Snm2jcZ.png" alt="avatar"/>
        </Avatar>
    </div>
</div>


<style>
    .container {
        display: flex;
        flex-wrap: inherit;
        justify-content: center;
    }
    .avatar{
        z-index: 1;
        margin-top: -70px;
    }
</style>
