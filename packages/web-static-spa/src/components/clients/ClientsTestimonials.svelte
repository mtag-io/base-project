<script>

    import {Card, Row, Col, Divider} from 'svelte-materialify/src';
    import Background from "../cards/Testimonials/Background.svelte";
    import Avatar from "../cards/Testimonials/Avatar.svelte";
    import {CardTitleContainer, CardSubTitleContainer, CardBodyContainer} from '../cards/index.js'

    export let items
</script>


{#each items as item}
    <Col>
        <Card style="width: 450px; height: 500px; overflow: hidden; justify-content: center">
            <Row class="d-sm-block">
                <Col style="flex-grow:0; padding-top: 0; padding-right: 0">
                    <Background/>
                </Col>
                <Col>
                    <div>
                        <Avatar/>
                        <CardTitleContainer>
                            {item.author}
                        </CardTitleContainer>
                        <CardSubTitleContainer>
                            {item.subtitle}
                        </CardSubTitleContainer>
                    </div>
                </Col>

                <div style="justify-content: center">
                    <Divider style="display:block; width: 70%; align-items: center; margin-left: 15%; margin-bottom: 15px"/>
                        <CardBodyContainer >
                            {item.body}
                        </CardBodyContainer>
                </div>
            </Row>
        </Card>
    </Col>
{/each}

<style>

</style>
