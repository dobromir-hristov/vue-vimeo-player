var VueVimeoPlayer = (function (exports, vue, Player) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Player__default = /*#__PURE__*/_interopDefaultLegacy(Player);

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
      var elementRef = vue.ref(null);

      var _toRefs = vue.toRefs(props),
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

      vue.onMounted(function () {
        player = new Player__default['default'](elementRef.value, Object.assign(options, props.options));
        setEvents();
      });
      vue.onBeforeUnmount(function () {
        return player.unload();
      });
      vue.watch(videoId, update);
      vue.watch(videoUrl, update);
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
    return vue.openBlock(), vue.createBlock("div", _hoisted_1, null, 512
    /* NEED_PATCH */
    );
  }

  script.render = render;

  function plugin(app) {
    app.component(script.name, script);
  }

  plugin.version = '0.1.1';

  exports.default = plugin;
  exports.vueVimeoPlayer = script;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, Vue, Vimeo.Player));
