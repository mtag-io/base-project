<script>
    import {Card, Row, Col} from 'svelte-materialify/src';

    export let gallery

</script>


    {#each gallery as image}
        <Col>
            <Card>
                <Row>
                    <Col>
                        <img src={image} alt="images"/>
                    </Col>
                </Row>
            </Card>
        </Col>
    {/each}

