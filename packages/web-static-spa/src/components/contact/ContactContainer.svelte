<script>
    import {Card, CardTitle, Button, Divider} from 'svelte-materialify/src';

</script>

<div class="container">
    <Card>
        <div class="pa-10 justify-lg-center">
        <CardTitle>CONTACT US</CardTitle>
        <Divider/>
        <slot/>
        <Button>SUBMIT</Button>
        </div>
    </Card>
</div>
<style>
    .container {
        padding-left: 20px;
        margin-bottom: 12px;
        display: flex;
        justify-content: center;
        margin-top: 12px;
    }
</style>
