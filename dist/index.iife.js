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
        "default": ''
      },
      videoUrl: {
        type: String,
        "default": ''
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

      if (!props.videoId && !props.videoUrl) {
        console.warn('[VueVimeoPlayer: You mist provide at least a videoId or a videoUrl prop]');
      }

      var mergeOptions = function mergeOptions(_ref3) {
        var id = _ref3.id,
            url = _ref3.url;
        var opts = {
          width: props.playerWidth,
          height: props.playerHeight,
          loop: props.loop,
          autoplay: props.autoplay,
          controls: props.controls
        };

        if (vue.unref(url)) {
          opts.url = vue.unref(url);
        }

        if (vue.unref(id)) {
          opts.id = vue.unref(id);
        }

        return opts;
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
        player = new Player__default['default'](elementRef.value, mergeOptions({
          id: props.videoId,
          url: props.videoUrl
        }));
        setEvents();
      });
      vue.onBeforeUnmount(function () {
        return player.unload();
      });
      vue.watch(videoId, function (id) {
        return player.loadVideo(mergeOptions({
          id: id
        }));
      });
      vue.watch(videoUrl, function (url) {
        return player.loadVideo(mergeOptions({
          url: url
        }));
      });
      vue.watch(vue.toRef(props, 'controls'), function () {
        return player.loadVideo(mergeOptions({
          url: videoUrl,
          id: videoId
        }));
      });

      var update = function update(id) {
        return player.loadVideo(mergeOptions({
          id: id
        }));
      };

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

  plugin.version = '1.0.4';

  exports.default = plugin;
  exports.vueVimeoPlayer = script;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, Vue, Vimeo.Player));
