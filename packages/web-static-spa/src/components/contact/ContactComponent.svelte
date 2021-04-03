<script>
    import {Col, Row, Textarea, TextField} from 'svelte-materialify/src'

    const emailRules = [
        (v) => !!v || 'Required',
        (v) => v.length <= 25 || 'Max 25 characters',
        (v) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || 'Invalid e-mail.'
        }
    ]

    let show = false
</script>

<div>
    <Row>
        <Col>
            <TextField counter="25">Name</TextField>
        </Col>
    </Row>
    <Row>
        <Col>
            <Col>
                <TextField counter="25" rules={emailRules}>Email</TextField>
            </Col>
        </Col>
    </Row>
    <Row>
        <Col>
            <Textarea placeholder="Message"/>
        </Col>
    </Row>
</div>
