const pkg = require('./package.json')

/** @type {import('bili').Config} */
module.exports = {
  input: 'src/index.js',
  output: {
    format: ['es', 'cjs', 'iife'],
    moduleName: 'VueVimeoPlayer'
  },
  globals: {
    vue: 'Vue',
    '@vimeo/player': 'Vimeo.Player'
  },
  plugins: {
    vue: true,
    replace: {
      '__VERSION__': pkg.version
    }
  }
}
