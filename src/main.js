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
  'playing',
  'pause',
  'ended',
  'timeupdate',
  'progress',
  'seeking',
  'seeked',
  'texttrackchange',
  'chapterchange',
  'cuechange',
  'cuepoint',
  'volumechange',
  'playbackratechange',
  'bufferstart',
  'bufferend',
  'error',
  'loaded',
  'durationchange',
  'fullscreenchange',
  'qualitychange',
  'camerachange',
  'resize'
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
    videoUrl: {
      default: undefined
    },
    loop: {
      default: false
    },
    autoplay: {
      default: false
    },
    controls: {
      default: true
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
      return this.player.loadVideo(videoId, this.getMergedOptions())
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
    },
    getMergedOptions() {
      const options = {
        id: this.videoId,
        width: this.playerWidth,
        height: this.playerHeight,
        loop: this.loop,
        autoplay: this.autoplay,
        controls: this.controls,
      }
      if (this.videoUrl) { options.url = this.videoUrl }

      return assign(options, this.options)
    }
  },
  mounted () {
    this.player = new Player(this.elementId, this.getMergedOptions())

    this.setEvents()
  },
  beforeDestroy () {
    this.player.unload()
  }
}
