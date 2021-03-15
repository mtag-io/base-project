import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [{
        input: "index.js",
        output: {
            sourcemap: true,
            format: "cjs",
            name: "commloc",
            file: `build/front.index.js`
        },
        plugins: [
            resolve({
                browser: true
            }),
            commonjs(),
        ],
        watch: {
            clearScreen: false,
        },
    },
    {
        input: "back.index.js",
        output: {
            sourcemap: true,
            format: "cjs",
            name: "commloc",
            file: `build/back.index.js`,
            globals:{
                "fs-extra": "fs",
                "lodash": "lodash",
                "color": "color"
            }
        },
        external:[
            'fs-extra',
            "lodash",
            "color"
        ],
        plugins: [
            resolve({
                preferBuiltins: false
            }),
            commonjs(),
        ],
        watch: {
            clearScreen: false,
        },
    }
    ];