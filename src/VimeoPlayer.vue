<template>
  <div ref="elementRef" />
</template>
<script>
import { watch, toRefs, onMounted, onBeforeUnmount, ref, unref, toRef } from 'vue'
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
      default: () => eventsToEmit
    }
  },
  setup (props, { emit }) {
    let player
    const elementRef = ref(null)
    const { videoId, videoUrl } = toRefs(props)
    if (!props.videoId && !props.videoUrl) {
      console.warn('[VueVimeoPlayer: You mist provide at least a videoId or a videoUrl prop]')
    }
    const mergeOptions = ({ id, url }) => {
      const opts = {
        width: props.playerWidth,
        height: props.playerHeight,
        loop: props.loop,
        autoplay: props.autoplay,
        controls: props.controls
      }
      if (unref(url)) {
        opts.url = unref(url)
      }
      if (unref(id)) {
        opts.id = unref(id)
      }
      return Object.assign(opts, props.options)
    }

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

      props.eventsToEmit.forEach(event => emitVueEvent({ player, event, emit }))
    }

    onMounted(() => {
      player = new Player(elementRef.value, mergeOptions({ id: props.videoId, url: props.videoUrl }))

      setEvents()
    })

    onBeforeUnmount(() => player.unload())

    watch(videoId, (id) => player.loadVideo(mergeOptions({ id })))
    watch(videoUrl, (url) => player.loadVideo(mergeOptions({ url })))
    watch(toRef(props, 'controls'), () => player.loadVideo(mergeOptions({ url: videoUrl, id: videoId })))

    const update = (id) => player.loadVideo(mergeOptions({ id }))

    return {
      update, play, pause, mute, unmute, elementRef, player
    }
  }
}
</script>
