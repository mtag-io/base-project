<script>
    import {ExpansionPanel, ExpansionPanels} from 'svelte-materialify/src';

    let value = [2];

    export let title
    export let body
    export let address

    function toggle(n) {
        if (value.includes(n)) {
            value.splice(value.indexOf(n), 1);
        } else {
            value.push(n);
        }
        value = value;
    }
</script>

<div>
    <ExpansionPanels multiple bind:value>
        <ExpansionPanel>
            <span slot="header">{title}</span>
            <span slot="subheader">{body}</span>
            <span slot="address">{address}</span>
           <slot name="testimonials"/>
        </ExpansionPanel>
    </ExpansionPanels>
</div>
