import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import toCamelCase from 'lodash.camelcase'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

const pkg = require('./package.json')

export default [
  {
    input: 'src/index.js',
    output: { format: 'umd', name: toCamelCase(pkg.name), file: 'dist/bundle.umd.js', exports: 'named' },
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      commonjs(),
      replace({
        '__VERSION__': pkg.version
      }),
      buble(),
      terser()
    ]
  },
  {
    input: 'src/index.js',
    output: { format: 'es', file: 'dist/bundle.es.js' },
    external: ['@vimeo/player', 'object-assign'],
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      commonjs(),
      replace({
        '__VERSION__': pkg.version
      }),
      buble(),
      terser()
    ]
  }
]
