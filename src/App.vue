<template>
  <div id="app">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <SoundCloudPlayer url="https://soundcloud.com/potionrecords/the-magician-together"></SoundCloudPlayer>
      </div>
    </div>
  </div>
</template>

<script>

  import SoundCloudPlayer from './components/SoundCloudPlayer';
  import { store } from './store/store'

  export default {
    name: 'app',
    store,
    components: {
      SoundCloudPlayer, 
    },
    data: function(){
      return {
        connection: null
      }
    },
    created: function(){
      console.log('Start connecting to websocket')
      this.connection = new WebSocket("wss://echo.websocket.org")

      this.connection.onopen = function (event) {
        console.log(event)
        console.log("Successfully connected")
      }

      this.connection.onmessage = function (event) {
        console.log(event)
      }
    }
  };
</script>

<style lang="scss">
  body {
    padding-top: 3em;
  }
</style>
