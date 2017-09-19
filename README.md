# Vue wrapper for Vimeo Embed Player

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
<vimeo-player :id='videoId'></vimeo-player>	
```

