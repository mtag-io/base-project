<script>
    import {Card, Col} from 'svelte-materialify/src';

    export let gallery

</script>


{#each gallery as image}
    <Col>
        <Card style="display:flex; width: 250px; height: 200px; overflow: hidden; justify-content: center;  background-color: black; align-items: center">
                    <div style="padding: 20px; justify-content: center; display: relative; ">
                        <img style="width: 100%; height: 100%; margin-left: auto;margin-right: auto;"
                             src={image} alt="images"/>
                    </div>
        </Card>
    </Col>
{/each}

