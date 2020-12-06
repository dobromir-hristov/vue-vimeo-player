# Vue wrapper for Vimeo Embed Player 
[![npm](https://img.shields.io/npm/v/vue-vimeo-player.svg)](https://www.npmjs.com/package/vue-vimeo-player) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![vue2](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)

Embed a Vimeo player as a Vue 3 component with ease, even with Nuxt.js SSR.

If you want the Vue 2 version, follow the instructions on the [master branch](https://github.com/dobromir-hristov/vue-vimeo-player/tree/master).

## Installation

Using npm:

```bash
npm install vue-vimeo-player@next --save
```
of load it via CDN

```html
<script src="//unpkg.com/vue-vimeo-player@next"></script>
```

## Getting Started

You can either import it in your whole project

 ```js
 import vueVimeoPlayer from 'vue-vimeo-player'
 import Vue from 'vue'
  
 const app = Vue.createApp(App)

 app.use(vueVimeoPlayer)

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

Just include the script from the CDN and attach it to your app instance

```html
<script src="//unpkg.com/vue@3"></script>
<script src="//unpkg.com/vue-vimeo-player@next"></script>
<!-- .... -->
<vimeo-player :video-id='videoId'></vimeo-player>
<script>
const app = Vue.createApp(App)
app.use(VueVimeoPlayer.default)
app.mount(...)
</script>	
```

## Usage with Nuxt.js

> **Warning:** Nuxt does not yet support Vue 3. Use the Master branch for now.

## Props
<table>
	<tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
      <th>Required</th>
    </tr>
    <tr>
        <td>autoplay</td>
        <td>Boolean</td>
        <td>false</td>
        <td>The video automatically begins to playback as soon as it can do.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>player-width</td>
        <td>String or Number</td>
        <td>640</td>
        <td>The width of the video's display area</td>
        <td>No</td>
    </tr>
    <tr>
        <td>player-height</td>
        <td>String or Number</td>
        <td>320</td>
        <td>The height of the video's display area</td>
        <td>No</td>
    </tr>
    <tr>
        <td>options</td>
        <td>Object</td>
        <td>{}</td>
        <td>Options to pass to Vimeo.Player. <a href="https://github.com/vimeo/player.js/#embed-options">See the Vimeo docs</a></td>
        <td>No</td>
    </tr>
    <tr>
        <td>video-id</td>
        <td>String</td>
        <td></td>
        <td>Vimeo player unique identifier</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>video-url</td>
        <td>String</td>
        <td>undefined</td>
        <td>Vimeo url to play video (if using private links)</td>
        <td>No</td>
    </tr>
    <tr>
        <td>loop</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Upon reaching the end of the video, automatically seek back to the start.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>controls</td>
        <td>Boolean</td>
        <td>true</td>
        <td>This parameter if `false` will hide all elements in the player (play bar, sharing buttons, etc) for a chromeless experience. ⚠️Warning: When using this parameter, the play bar and UI will be hidden. To start playback for your viewers, you'll need to either enable autoplay or use our player SDK to start and control playback. **(available to Plus, PRO, or Business members)**</td>
        <td>No</td>
    </tr>
</table>
 
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
 - playing
 - pause
 - ended
 - timeupdate
 - progress
 - seeking
 - seeked
 - texttrackchange
 - chapterchange
 - cuechange
 - cuepoint
 - volumechange
 - playbackratechange
 - bufferstart
 - bufferend
 - error
 - loaded
 - durationchange
 - fullscreenchange
 - qualitychange
 - camerachange
 - resize

## Example

```js
 // app.js
 import vueVimeoPlayer from 'vue-vimeo-player'
 import Vue from 'vue'
 import App from '@/App'

 const app = Vue.createApp(App)
 app.use(vueVimeoPlayer)
```
```html
<template>
	<vimeo-player ref="player" :video-id="videoID" :player-height="height" @ready="onReady"/>
</template>
<script>
export default {
	data() {
		return {
			videoID: 'some-id',
			height: 500,
			options: {
				muted: true,
                autoplay: true,
			},
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
		pause () {
			this.$refs.player.pause()
		}
	}
}
</script>
```
