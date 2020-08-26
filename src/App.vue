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
  import io from 'socket.io-client'

  export default {
    name: 'app',
    store,
    components: {
      SoundCloudPlayer, 
    },
    data: function(){
      return {
        //connection: null,
        user: '',
        message: '',
        messages: [],
        socket: io('localhost:3000')
      }
    },
    mounted(){
      this.socket.on('MESSAGE', (data) => {
          this.messages = [...this.messages, data];
          console.log(this.messages)
          // you can also do this.messages.push(data)
      });
    }
    // created: function(){
    //   console.log('Start connecting to websocket')
    //   this.connection = new WebSocket("ws://192.168.0.107:3000")

    //   this.connection.onopen = function (event) {
    //     console.log(event)
    //     console.log("Successfully connected")
    //   }

    //   this.connection.onmessage = function (event) {
    //     console.log(event)
    //   }
    // }
  };
</script>

<style lang="scss">
  body {
    padding-top: 3em;
  }
</style>
