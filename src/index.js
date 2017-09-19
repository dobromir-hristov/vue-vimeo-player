import VimeoPlayer from './main.js'

function plugin (vue, options) {
	Vue.component('vimeo-player', vimeoPlayer)
}

plugin.version = '__VERSION__'

export default plugin


export {
	vimeoPlayer
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}