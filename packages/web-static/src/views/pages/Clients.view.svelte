<script>
    import { Link} from "svelte-routing";
</script>

<div class='mt-lg'>
    <p class='font-bold text-orange-600 text-4xl'>OUR CLIENTS</p>
    <p class='font-bold text-lg mb-10'>Well... some of them:</p>
    <div class='flex row justify-between content-evenly mt-lg'>
        <div class='col col-sm-4'>
            <img src="https://imgur.com/TIjS432.png" alt="Peugeot" class='w-full h-full'/>
        </div>
        <div class='col col-sm-4'>
            <img alt="bbc" src="https://imgur.com/F31ZS7y.png" class='w-full h-full'/>
        </div>
        <div class='col col-sm-4'>
            <img alt="disney" src="https://imgur.com/v9DE0Wt.png" class='w-full h-full'/>
        </div>
    </div>
    <div class='flex justify-between content-evenly mt-10'>
        <div class='col col-sm-4 p-0'>
            <img alt="microsoft" src="https://imgur.com/OjKbjyI.png" class='w-full h-full p-0'/>
        </div>
        <div class='col col-sm-4 '>
            <img alt="Home_office" src="https://imgur.com/v66XAqa.png" class='w-full h-full p-0'/>
        </div>
        <div class='col col-sm-4 pr-0'>
            <img alt="WHO" src="https://imgur.com/XoLSKeX.png" class='w-full h-full p-0'/>
        </div>
    </div>
    <div class='mt-lg'>
        <p class='text-4xl font-weight-bold text-orange-500 mb-4'>TESTIMONIALS</p>
        <div class='row'>
            <div class='col-sm'>
                <p class='font-bold text-justify text-white'>
                    "Thank you so much for sending this [voiceover project] through. It’s lovely to work with a team
                    who is as reliable as you are.
                    I know when I open my mailbox in the morning, the files will be waiting –
                    no need for me to chase and delay other work while we wait for the audio.</p>

                <p class='font-bold text-justify text-white'>Thanks again and I’ll be in touch with further projects in the
                    New
                    Year.
                    […] Please pass on our thanks to Katie [English UK voice talent] as well – she’s a favourite
                    amongst
                    the team here!"
                </p>
                <br/>
                <p class='font-bold text-justify text-white'>
                    Nicole Mekisich, IT Training Consultant Kaleidoscope Training - Australia
                </p>
            </div>
            <div class='col-sm'>
                <p class='font-bold text-justify text-white'>
                    "Hey Dan, I wanted to thank you and your team for the quick turn around on ergonomics,
                    you got us all 12 languages before the 20th and it was a huge help.
                    Thanks again! I’m hoping to have files ready for you a little earlier for our next month's
                    topic...
                    Cheers."
                </p>
                <br/>
                <p class='font-bold text-justify text-white'>
                    Kyle Morton, Senior Editor Multimedia Training Systems, Inc. - USA More testimonials...
                </p>
                <div class='flex justify-end'>
                    <button class=' bg-orange-500 rounded-full px-4 py-2 mt-48 hover:bg-red-600 hover:text-blue-100'>
                        <Link to='./testimonials' class='text-dark font-bold italic text-xs'>More
                            testimonials...</Link>
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>

