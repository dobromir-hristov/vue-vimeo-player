import vueVimeoPlayer from './main.js'

function plugin (vue, options) {
	Vue.component('vimeo-player', vueVimeoPlayer)
}

plugin.version = '__VERSION__'

export default plugin


export {
	vueVimeoPlayer
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}