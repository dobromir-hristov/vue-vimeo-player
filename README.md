# Vue wrapper for Vimeo Embed Player 
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/vue-vimeo-player) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

The Vue vimeo player allows you to use the Vimeo player as a Vue component with ease.

## Installation

Using npm:

```
npm install vue-vimeo-player --save
```
of load it via CDN

```
<script src="//unpkgd.com/vue-vimeo-player"></script>
```

## Getting Started

You can either import it in your whole project

 ```js
 import VimeoPlayer from 'vue-vimeo-player'
 import Vue from 'vue'

 Vue.use(VimeoPlayer)

```
or import it locally in a component

```js
  import { VimeoPlayer } from 'vue-vimeo-player'
  
  export default {
  	data: {},
  	components: { VimeoPlayer }
  }
```

## Usage without module bundler

Just include the script from the CDN and you are good to go.

```html
<script src="//unpkgd.com/vue@2.4"></script>
<script src="//unpkgd.com/vue-vimeo-player"></script>
....
<vimeo-player :video-id='videoId'></vimeo-player>	
```

## Props

 - player-width: String or Number, default 100%
 - player-height: String or Number, default 320
 - options: Object - options to pass to Vimeo.Player
 - video-id: String, required
 - loop: Boolean
 - autoplay: Boolean

 
## Methods

 - update(videoID): Recreates the Vimeo player with the provided ID
 - play()
 - pause()
 - mute()
 - unmute()

## Properties

Useful properties to interact with

 - player - The instance of the Vimeo player


## Events

Events emitted from the component. 


The ready event only passes the player instance
 - ready

Every other event has these properties: (event, data, player)

 - play
 - pause
 - ended
 - timeupdate
 - progress
 - seeked
 - texttrackchange
 - cuechange
 - cuepoint
 - volumechange
 - error
 - loaded


## Example


```js
 // app.js
 import VimeoPlayer from 'vue-vimeo-player'
 import Vue from 'vue'

 Vue.use(VimeoPlayer)
```
```html
<template>
	<vimeo-player ref="player" :video-id="videoID" @ready="onReady" :player-height="height"></vimeo-player>
</template>
<script>
export default {
	data() {
		return {
			videoID: 'some-id',
			height: 500,
			options: {},
			playerReady: false
		}
	},
	methods: {
		onReady() {
			this.playerReady = true
		},
		play () {
			this.$refs.player.play()
		},
		stop () {
			this.$refs.player.stop()
		}
	}
}
</script>
```