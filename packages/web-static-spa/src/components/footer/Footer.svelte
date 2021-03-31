<script>
    import {Footer, Icon} from 'svelte-materialify/src';

    import {mdiFacebook} from '@mdi/js';
    import { mdiTwitter } from '@mdi/js';
    import { mdiInstagram } from '@mdi/js';
    import { mdiLinkedin } from '@mdi/js';
    import { mdiYoutube } from '@mdi/js';

</script>

<Footer padless class="dark theme--dark justify-center flex-column ">
    <div class="container mb-3">
        <div>
            <h4>Let's keep in touch!</h4>
            <h5>Find us on any of these platforms</h5>
            <div class="container">
                <a class="primary-text d-flex" href="https://www.facebook.com/RedCatStudiosUK/" target="_blank">
                    <Icon path={mdiFacebook}/>
                </a>
                <a class="primary-text d-flex" href="https://twitter.com/RedCatStudiosUK" target="_blank">
                    <Icon path={mdiTwitter}/>
                </a>
                <a class="primary-text d-flex" href="https://www.instagram.com/red.cat.studios/" target="_blank">
                    <Icon path={mdiInstagram}/>
                </a>
                <a class="primary-text d-flex" href="https://www.linkedin.com/showcase/red-cat-studios/" target="_blank">
                    <Icon path={mdiLinkedin}/>
                </a>
                <a class="primary-text d-flex" href="https://www.youtube.com/channel/UCdLyRwbRdwCTzo7lAb2dnFA" target="_blank">
                    <Icon path={mdiYoutube}/>
                </a>

            </div>
        </div>

        <div class="container-address">
            <p class="p-address">  32 Queens Terrace, Southampton, SO14 3BQ, United Kingdom</p>
            <p class="p-address">  Phone: +44 (0)2380 333 360</p>
            <p class="p-address">   E-mail: Contact@RedCatStudios.uk</p>
        </div>
    </div>
    <div class="container-rights grey darken-1 pa-2 text-center" style="width:100%">
        Company Registered in England & Wales No. 05434667 | VAT Reg. No. GB860906417 | D-U-N-S® Number:
        34-628-3901
        <br/>
        <span> © 2005-2021, Red Cat Studios Ltd. All rights reserved.</span>
    </div>
</Footer>


<style>
    .container {
        display: flex;
        justify-content: center;
    }
    .container-address{
        display: block;
        justify-content: center;
        margin-left: 25px;
        font-size: 12px;

    }
    .p-address{
        margin: 2px;
    }
    .container-rights{
        font-size: 8px;
    }
</style>
