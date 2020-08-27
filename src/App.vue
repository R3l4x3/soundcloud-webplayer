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
    }
  };
</script>

<style lang="scss">
  body {
    padding-top: 3em;
  }
</style>
