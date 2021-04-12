<script>
    import {Card, Row, Col} from 'svelte-materialify/src';
    import {AboutCardBodyContainer, CardTitleContainer} from '../index'

    export let items
</script>


{#each items as item}
    <Col>
        <Card style="width: 450px; height: 400px; overflow: hidden; justify-content: center">
            <Row>
                <Col>
                    <CardTitleContainer>
                        {item.title}
                    </CardTitleContainer>
                    <AboutCardBodyContainer>
                        {item.body}
                    </AboutCardBodyContainer>
                </Col>
            </Row>
        </Card>
    </Col>
{/each}


