import Player from '@vimeo/player'
import assign from 'object-assign'

let pid = 0

function emitVueEvent (event) {
  this.player.on(event, (data) => {
    this.$emit(event, data, this.player)
  })
}

const defaultEventsToEmit = [
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
      type: Object,
      default: () => ({})
    },
    videoId: {
      type: String,
      default: ''
    },
    videoUrl: {
      type: String,
      default: ''
    },
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    eventsToEmit: {
      type: Array,
      default: () => defaultEventsToEmit
    }
  },
  data () {
    pid += 1

    return {
      elementId: `vimeo-player-${pid}`,
      player: null
    }
  },
  computed: {
    getOptions () {
      const options = {
        width: this.playerWidth,
        height: this.playerHeight,
        loop: this.loop,
        autoplay: this.autoplay,
        controls: this.controls
      }
      if (this.videoUrl) { options.url = this.videoUrl }
      if (this.videoId) { options.id = this.videoId }
      return assign(options, this.options)
    }
  },
  watch: {
    videoId: 'update',
    videoUrl: 'update',
    controls: 'update'
  },
  mounted () {
    if (!this.videoUrl && !this.videoId) {
      console.warn('[VueVimeoPlayer]: You must provide at least a videoUrl or videoId')
    }
    this.player = new Player(this.elementId, this.getOptions)

    this.setEvents()
  },
  beforeDestroy () {
    this.player.unload()
  },
  methods: {
    /**
     * Loads a new video ID.
     * Returns a promise
     * @param {Number} videoId
     * @return {LoadVideoPromise}
     */
    update () {
      return this.player.loadVideo(this.getOptions)
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

      this.eventsToEmit.forEach(event => emitVueEvent.call(vm, event))
    }
  },
  render (h) {
    return h('div', { attrs: { id: this.elementId } })
  }
}
