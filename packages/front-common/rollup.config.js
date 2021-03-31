import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

export default {
    input: '_index.js',
    output: {
        sourcemap: true,
        format: 'cjs',
        name: 'front-common',
        file: `build/index.js`
    },
    plugins: [
        resolve({
            browser: true
        }),
        replace({
            preventAssignment: true,
            'process.browser': true,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        commonjs()
    ],
    watch: {
        clearScreen: false
    }
}