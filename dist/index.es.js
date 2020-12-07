import { ref, toRefs, onMounted, onBeforeUnmount, watch, openBlock, createBlock } from 'vue';
import Player from '@vimeo/player';

function emitVueEvent(_ref) {
  var player = _ref.player,
      event = _ref.event,
      emit = _ref.emit;
  player.on(event, function (data) {
    return emit(event, data, player);
  });
}

var eventsToEmit = ['play', 'playing', 'pause', 'ended', 'timeupdate', 'progress', 'seeking', 'seeked', 'texttrackchange', 'chapterchange', 'cuechange', 'cuepoint', 'volumechange', 'playbackratechange', 'bufferstart', 'bufferend', 'error', 'loaded', 'durationchange', 'fullscreenchange', 'qualitychange', 'camerachange', 'resize'];
var script = {
  name: 'VimeoPlayer',
  props: {
    playerHeight: {
      type: Number,
      "default": 320
    },
    playerWidth: {
      type: Number,
      "default": 640
    },
    options: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    videoId: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      "default": undefined
    },
    loop: {
      type: Boolean,
      "default": false
    },
    autoplay: {
      type: Boolean,
      "default": false
    },
    controls: {
      type: Boolean,
      "default": true
    }
  },
  setup: function setup(props, _ref2) {
    var emit = _ref2.emit;
    var player;
    var elementRef = ref(null);

    var _toRefs = toRefs(props),
        videoId = _toRefs.videoId,
        videoUrl = _toRefs.videoUrl;

    var options = {
      id: props.videoId,
      width: props.playerWidth,
      height: props.playerHeight,
      loop: props.loop,
      autoplay: props.autoplay,
      controls: props.controls
    };

    if (videoUrl.value) {
      options.url = videoUrl.value;
    }

    var update = function update(videoId) {
      return player.loadVideo(videoId);
    };

    var play = function play() {
      return player.play();
    };

    var pause = function pause() {
      return player.pause();
    };

    var mute = function mute() {
      return player.setVolume(0);
    };

    var unmute = function unmute() {
      var volume = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
      return player.setVolume(volume);
    };

    var setEvents = function setEvents() {
      player.ready().then(function () {
        emit('ready', player);
      })["catch"](function (error) {
        emit('error', error, player);
      });
      eventsToEmit.forEach(function (event) {
        return emitVueEvent({
          player: player,
          event: event,
          emit: emit
        });
      });
    };

    onMounted(function () {
      player = new Player(elementRef.value, Object.assign(options, props.options));
      setEvents();
    });
    onBeforeUnmount(function () {
      return player.unload();
    });
    watch(videoId, update);
    watch(videoUrl, update);
    return {
      update: update,
      play: play,
      pause: pause,
      mute: mute,
      unmute: unmute,
      elementRef: elementRef
    };
  }
};

var _hoisted_1 = {
  ref: "elementRef"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, null, 512
  /* NEED_PATCH */
  );
}

script.render = render;

function plugin(app) {
  app.component(script.name, script);
}

plugin.version = '1.0.3';

export default plugin;
export { script as vueVimeoPlayer };
