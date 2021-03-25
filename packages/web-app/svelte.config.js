const sveltePreprocess = require('svelte-preprocess')

module.exports = sveltePreprocess({
    scss: {
        includePaths: [
            'theme',
            '../../node_modules/svelte-materialify/src/styles'
        ]
    }
})