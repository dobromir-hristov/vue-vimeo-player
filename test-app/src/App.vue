<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1> With ID </h1>
  <VimeoPlayer :video-id="id" />
  <h1>With Url</h1>
  <VimeoPlayer :video-url="url" />
  <h1>With dynamic controls</h1>
  <VimeoPlayer :video-id="id" :controls="hasControls" />
  <button @click="hasControls = !hasControls">Toggle controls {{hasControls}}</button>
  <h1>No ID</h1>
  <VimeoPlayer />
  <button @click="change">Change the source</button>
</template>

<script setup>
import { ref } from 'vue'
import { vueVimeoPlayer as VimeoPlayer } from '../../dist/index.es.js'

const id = ref('510149559')
const url = ref('https://vimeo.com/510149559')
const hasControls = ref(false)

const change = () => {
  id.value = '470292592'
  url.value = 'https://vimeo.com/470292592'
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
