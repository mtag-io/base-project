<script>
    import {Card, CardTitle, CardSubtitle, CardText, Row, Col} from 'svelte-materialify/src';

    export let items
</script>

<div>
    {#each items as item}
        <Card>
            <Row>
                <Col>
                    <CardTitle>{item.author}</CardTitle>
                    <CardSubtitle>{item.subtitle}</CardSubtitle>
                    <CardText> {item.body}</CardText>
                </Col>
            </Row>
        </Card>
    {/each}
</div>
