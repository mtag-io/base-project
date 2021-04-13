<script>
    import {Card, Row, Col} from 'svelte-materialify/src';


    export let items
</script>

    {#each items as item}
        <Col>
            <Card>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Card>
        </Col>
    {/each}
