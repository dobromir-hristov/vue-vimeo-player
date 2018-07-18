import Player from '@vimeo/player'
import assign from 'object-assign'

let pid = 0

function emitVueEvent (event) {
  this.player.on(event, (data) => {
    this.$emit(event, data, this.player)
  })
}

const eventsToEmit = [
  'play',
  'pause',
  'ended',
  'timeupdate',
  'progress',
  'seeked',
  'texttrackchange',
  'cuechange',
  'cuepoint',
  'volumechange',
  'error',
  'loaded'
]
// @vue/component
export default {
  props: {
    playerHeight: {
      default: 320
    },
    playerWidth: {
      default: 640
    },
    options: {
      default: () => ({})
    },
    videoId: {
      required: true
    },
    loop: {
      default: false
    },
    autoplay: {
      default: false
    }
  },
  render (h) {
    return h('div', { attrs: { id: this.elementId } })
  },
  watch: {
    videoId: 'update'
  },
  data () {
    pid += 1

    return {
      elementId: `vimeo-player-${pid}`,
      player: null
    }
  },
  methods: {
    /**
     * Loads a new video ID.
     * Returns a promise
     * @param {Number} videoId
     * @return {LoadVideoPromise}
     */
    update (videoId) {
      return this.player.loadVideo(videoId)
    },
    play () {
      return this.player.play()
    },
    pause () {
      return this.player.pause()
    },
    mute () {
      return this.player.setVolume(0)
    },
    unmute (volume = 0.5) {
      return this.player.setVolume(volume)
    },
    setEvents () {
      const vm = this

      this.player.ready()
        .then(function () {
          vm.$emit('ready', vm.player)
        })
        .catch((error) => {
          vm.$emit('error', error, vm.player)
        })

      eventsToEmit.forEach(event => emitVueEvent.call(vm, event))
    }
  },
  mounted () {
    const options = {
      id: this.videoId,
      width: this.playerWidth,
      height: this.playerHeight,
      loop: this.loop,
      autoplay: this.autoplay
    }

    this.player = new Player(this.elementId, assign(options, this.options))

    this.setEvents()
  },
  beforeDestroy () {
    this.player.unload()
  }
}
