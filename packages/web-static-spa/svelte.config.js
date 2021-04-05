const sveltePreprocess = require('svelte-preprocess')
const {dataFile} = require('./__config__/static.json')

module.exports = sveltePreprocess({
    scss: {
        includePaths: [
            'theme',
            '../../node_modules/svelte-materialify/src/styles',
            '../../node_modules/front-common/src/components'
        ]
    },
    replace:[
        [
            'static-props',
            `./${dataFile}`
        ]
    ]
})