# Vue wrapper for Vimeo Embed Player 
[![npm](https://img.shields.io/npm/v/vue-vimeo-player.svg)](https://www.npmjs.com/package/@juannnesss/vue-vimeo-player) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

The Vue vimeo player allows you to use the Vimeo player as a Vue component with ease, even with Nuxt.js SSR.

this proyect is just a fork from another work(https://github.com/dobromir-hristov/vue-vimeo-player)

## Installation

Using npm:

```bash
npm install @juannnesss/vue-vimeo-player --save
```

## Getting Started

You can either import it in your whole project

 ```js
 import vueVimeoPlayer from '@juannnesss/vue-vimeo-player
 import Vue from 'vue'

 Vue.use(vueVimeoPlayer)

```
or import it locally in a component

```js
  import { vueVimeoPlayer } from '@juannnesss/vue-vimeo-player'
  
  export default {
  	data: {},
  	components: { vueVimeoPlayer }
  }
```



## Usage with Nuxt.js

As we know Nuxt.js allows the really cool advantage of Server Side Rendering, but this means there is no `window` variable.
To fix this, we need to tell Nuxt.js to skip rendering our component on the server and render it just on the Browser

We need to create a file inside the `plugins` directory called `vimeo-player.js` or what ever you see fit.
```js
// plugins/vimeo-player.js
import Vue from 'vue'
import vueVimeoPlayer from '@juannnesss/vue-vimeo-player'

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
      '@juannnesss/vue-vimeo-player'
    ],
}
// ....
```

### Using the <no-ssr></no-ssr> component

Another option is to use the [no-ssr](https://nuxtjs.org/api/components-no-ssr/) component to wrap the vue-vimeo component in the template. 

```html
<no-ssr>
  <vimeo-player ref="player" :video-id="videoID"/>
</no-ssr>	
```

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
        <td>Options to pass to Vimeo.Player</td>
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
        <td>loop</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Upon reaching the end of the video, automatically seek back to the start.</td>
        <td>No</td>
    </tr>
</table>
 
## Methods

 - update(videoID): Recreates the Vimeo player with the provided ID
 - getBuffered()
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

The getBuffered() Method returns a promise

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
        async buffered(){
           let buf = await this.$refs.player.getBuffered()
            .then(function(buffered) {
                // buffered = an array of the buffered video time ranges.
                return buffered
            }).catch(function(error) {
                // an error occurred
            });
            console.log('Buffered Array []',buf)
            // buf.lenght==0 mean nothins has been buffered yet
        },
		pause () {
			this.$refs.player.pause()
		}
	}
}
</script>
```
