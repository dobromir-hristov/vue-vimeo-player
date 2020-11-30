import vueVimeoPlayer from './VimeoPlayer.vue'

function plugin (app) {
  app.component(vueVimeoPlayer.name, vueVimeoPlayer)
}

plugin.version = '__VERSION__'

export default plugin

export {
  vueVimeoPlayer
}
