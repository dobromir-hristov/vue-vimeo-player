import Player from"@vimeo/player";import assign from"object-assign";var pid=0;function emitVueEvent(e){var t=this;this.player.on(e,function(i){t.$emit(e,i,t.player)})}var defaultEventsToEmit=["play","playing","pause","ended","timeupdate","progress","seeking","seeked","texttrackchange","chapterchange","cuechange","cuepoint","volumechange","playbackratechange","bufferstart","bufferend","error","loaded","durationchange","fullscreenchange","qualitychange","camerachange","resize"],vueVimeoPlayer={props:{playerHeight:{default:320},playerWidth:{default:640},options:{type:Object,default:function(){return{}}},videoId:{type:String,default:""},videoUrl:{type:String,default:""},loop:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!1},controls:{type:Boolean,default:!0},eventsToEmit:{type:Array,default:defaultEventsToEmit}},data:function(){return{elementId:"vimeo-player-"+(pid+=1),player:null}},computed:{getOptions:function(){var e={width:this.playerWidth,height:this.playerHeight,loop:this.loop,autoplay:this.autoplay,controls:this.controls};return this.videoUrl&&(e.url=this.videoUrl),this.videoId&&(e.id=this.videoId),assign(e,this.options)}},watch:{videoId:"update",videoUrl:"update",controls:"update"},mounted:function(){this.videoUrl||this.videoId||console.warn("[VueVimeoPlayer]: You must provide at least a videoUrl or videoId"),this.player=new Player(this.elementId,this.getOptions),this.setEvents()},beforeDestroy:function(){this.player.unload()},methods:{update:function(){return this.player.loadVideo(this.getOptions)},play:function(){return this.player.play()},pause:function(){return this.player.pause()},mute:function(){return this.player.setVolume(0)},unmute:function(e){return void 0===e&&(e=.5),this.player.setVolume(e)},setEvents:function(){var e=this;this.player.ready().then(function(){e.$emit("ready",e.player)}).catch(function(t){e.$emit("error",t,e.player)}),this.eventsToEmit.forEach(function(t){return emitVueEvent.call(e,t)})}},render:function(e){return e("div",{attrs:{id:this.elementId}})}};function plugin(e,t){e.component("vimeo-player",vueVimeoPlayer)}plugin.version="0.2.0","undefined"!=typeof window&&window.Vue&&window.Vue.use(plugin);export default plugin;export{vueVimeoPlayer};
