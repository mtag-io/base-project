<script>
    import {Card, CardTitle, CardText, Row, Col} from 'svelte-materialify/src';
    import {CardBodyContainer, CardTitleContainer} from '../index'

    export let items
</script>


{#each items as item}
    <Col>
        <Card>
            <Row>
                <Col>
                   <CardTitleContainer>
                        <CardTitle>{item.title}</CardTitle>
                   </CardTitleContainer>
                   <CardBodyContainer>
                        <CardText> {item.body}</CardText>
                   </CardBodyContainer>
                </Col>
            </Row>
        </Card>
    </Col>
{/each}


