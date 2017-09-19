import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel';
import toCamelCase from 'lodash.camelcase'
const pkg = require('./package.json');

export default {
    input: 'src/index.js',
    output: [
        { format: 'umd', name: toCamelCase(pkg.name), file: 'dist/bundle.umd.js', exports: 'named' },
        { format: 'es', file: 'dist/bundle.es.js' }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
			exclude: 'node_modules/**'
        })
    ]
};