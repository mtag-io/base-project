<script>
    import {TextField, Row, Col, Icon, Textarea} from 'svelte-materialify/src';
    import {mdiEyeOff, mdiEye} from '@mdi/js';

    const emailRules = [
        (v) => !!v || 'Required',
        (v) => v.length <= 25 || 'Max 25 characters',
        (v) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(v) || 'Invalid e-mail.';
        },
    ];

    let show = false;
</script>

<div>
    <Row>
        <Col>
            <TextField counter="25" rules={emailRules}>Email</TextField>
        </Col>
    </Row>
    <Row>
        <Col>
            <TextField type={show ? 'text' : 'password'}>
                Password
                <div slot="append"
                     on:click={() => {
                     show = !show;
                     }}>
                    <Icon path={show ? mdiEyeOff : mdiEye}/>
                </div>
            </TextField>
        </Col>
    </Row>
    <Row>
        <Col>

            <label>
                <Textarea/>
            </label>

        </Col>
    </Row>
</div>
