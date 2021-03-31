<script>
    import {
        Card,
        CardTitle,
        CardSubtitle,
        CardActions,
        Row,
        Col,
    } from 'svelte-materialify/src';

    const songs = [
        { name: 'Tuba Angel', author: 'Иοκτцяηаι' },
        { name: 'Tuba Mech', author: 'Noah Giesler' },
        { name: 'Tuba Archmage', author: 'Noah Giesler' },
    ];
</script>

<div>
    {#each songs as song, i}
        <Card>
            <Row>
                <Col cols={8}>
                    <CardTitle>{song.name}</CardTitle>
                    <CardSubtitle>{song.author}</CardSubtitle>
                    <CardActions>
                        <slot name="audio-player"/>
                    </CardActions>
                </Col>
            </Row>
        </Card>
    {/each}
</div>
