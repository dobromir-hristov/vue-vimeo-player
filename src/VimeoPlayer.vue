<template>
  <div ref="elementRef" />
</template>
<script>
import { watch, toRefs, onMounted, onBeforeUnmount, ref } from 'vue'
import Player from '@vimeo/player'

function emitVueEvent ({ player, event, emit }) {
  player.on(event, data => emit(event, data, player))
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

export default {
  name: 'VimeoPlayer',
  props: {
    playerHeight: {
      type: Number,
      default: 320
    },
    playerWidth: {
      type: Number,
      default: 640
    },
    options: {
      type: Object,
      default: () => ({})
    },
    videoId: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      default: undefined
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
    }
  },
  setup (props, { emit }) {
    let player
    const elementRef = ref(null)
    const { videoId, videoUrl } = toRefs(props)
    const options = {
      id: props.videoId,
      width: props.playerWidth,
      height: props.playerHeight,
      loop: props.loop,
      autoplay: props.autoplay,
      controls: props.controls
    }
    if (videoUrl.value) {
      options.url = videoUrl.value
    }

    const update = videoId => player.loadVideo(videoId)
    const play = () => player.play()
    const pause = () => player.pause()
    const mute = () => player.setVolume(0)
    const unmute = (volume = 0.5) => player.setVolume(volume)

    const setEvents = () => {
      player.ready().then(() => {
        emit('ready', player)
      }).catch((error) => {
        emit('error', error, player)
      })

      eventsToEmit.forEach(event => emitVueEvent({ player, event, emit }))
    }

    onMounted(() => {
      player = new Player(elementRef.value, Object.assign(options, props.options))

      setEvents()
    })

    onBeforeUnmount(() => player.unload())

    watch(videoId, update)
    watch(videoUrl, update)

    return {
      update, play, pause, mute, unmute, elementRef
    }
  }
}
</script>
