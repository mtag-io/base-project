<script>
    import {Card, CardTitle, CardText, Row, Col} from 'svelte-materialify/src';

    export let items
</script>

<div class="container">
    {#each items as item}
       <div class="card-container">
            <Card style="max-width:400px;">
                <Row>
                    <Col cols={2}>
                        <img src={item.logo} alt="logo"/>
                    </Col>

                    <Col cols={10}>
                        <CardTitle>{item.title}</CardTitle>
                        <CardText>{item.body}</CardText>
                    </Col>
                </Row>
            </Card>
       </div>
    {/each}
</div>

<style>
    .container {
        margin-bottom: 12px;
        display: flex;
        justify-content: center;
        margin-top: 12px;
    }
    .card-container{
        padding: 4px;
    }
</style>
