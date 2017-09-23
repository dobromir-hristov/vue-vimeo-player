# Vue wrapper for Vimeo Embed Player 
[![npm](https://img.shields.io/npm/v/vue-vimeo-player.svg)](https://www.npmjs.com/package/vue-vimeo-player) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

The Vue vimeo player allows you to use the Vimeo player as a Vue component with ease, even with Nuxt.js SSR.

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
 import vueVimeoPlayer from 'vue-vimeo-player'
 import Vue from 'vue'

 Vue.use(vueVimeoPlayer)

```
or import it locally in a component

```js
  import { vueVimeoPlayer } from 'vue-vimeo-player'
  
  export default {
  	data: {},
  	components: { vueVimeoPlayer }
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

## Usage with Nuxt.js

As we know Nuxt.js allows the really cool advantage of Server Side Rendering, but this means there is no `window` variable.
To fix this, we need to tell Nuxt.js to skip rendering our component on the server and render it just on the Browser

We need to create a file inside the `plugins` directory called `vimeo-player.js` or what ever you see fit.
```js
// plugins/vimeo-player.js
import Vue from 'vue'
import vueVimeoPlayer from 'vue-vimeo-player'

Vue.use(vueVimeoPlayer)

```

Now we need to tell Nuxt to load our plugin inside `nuxt.config.js`

```js
// ....
plugins: [
    { src: `~plugins/vimeo-player`, ssr: false }
],
build: {
    vendor: [
      'vue-vimeo-player'
    ],
}
// ....
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
 import vueVimeoPlayer from 'vue-vimeo-player'
 import Vue from 'vue'

 Vue.use(vueVimeoPlayer)
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