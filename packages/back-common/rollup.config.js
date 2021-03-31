import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: '_index.js',
    output: {
        sourcemap: true,
        format: 'cjs',
        name: 'back-common',
        file: `build/index.js`,
        globals: {
            'fs-extra': 'fs',
            'lodash': 'lodash',
            'color': 'color',
            'crypto': 'crypto'
        }
    },
    external: [
        'fs-extra',
        'lodash',
        'color',
        'crypto'
    ],
    plugins: [
        resolve({
            preferBuiltins: false
        }),
        commonjs()
    ],
    watch: {
        clearScreen: false
    }
}