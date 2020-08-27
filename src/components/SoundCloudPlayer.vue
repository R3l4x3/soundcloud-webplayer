<template>
  <div>
    <div id="sc-webplayer" class="card">
      <header class="card-header">
        <p class="card-header-title">
          SoundCloud Web Player
        </p>
      </header>
      <div class="card-content" v-if="content">
        <div class="media">
          <div class="media-left">
            <img :src="song.cover" alt="Image">
          </div>
          <div class="media-content">
            <p class="title is-4">{{song.title}}</p>
            <p class="subtitle is-6">{{song.artist}}</p>
            <p class="subtitle is-6">{{ song.created_at }}</p>
          </div>
        </div>
        <div class="content">
          <div class="columns" id="progressBarWrapper">
            <div class="column is-narrow has-text-centered">
              <span>{{ progressBarCurrentPosition }}</span>
            </div>
            <div class="column is-fullwidth" id="progressBar">
              <!-- <nouislider :config="progressSlider.config" :values="progressSlider.values"></nouislider> -->
            </div>
            <div class="column is-narrow has-text-centered">{{progressBarDuration}}</div>
          </div>
          <p v-html="prettyDescription"></p>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click.prevent="changeSong">New Song</a>
        <a class="card-footer-item" v-show="running" @click.prevent="toggleSong"><i class="fa fa-pause"
                                                                                    aria-hidden="true"></i>
        </a>
        <a class="card-footer-item" v-show="!running" @click.prevent="toggleSong">
          <i v-if="!content" class="fa fa-spinner fa-pulse fa-fw is-primary"></i>
          <i v-if="content" class="fa fa-play" aria-hidden="true"></i>
        </a>
        <a class="card-footer-item" v-show="!running" @click.prevent="playNewSong">
          <i v-if="!content" class="fa fa-spinner fa-pulse fa-fw is-primary"></i>
          <i v-if="content" class="fa fa-angle-right" aria-hidden="true"></i>
        </a>
      </footer>
    </div>

    <!--Tip Section-->
    <section class="section">
      <article class="message is-info">
        <div class="message-body">
          <h3>Tracklist:</h3>
          <li v-for="track in playlist" :key="track.id">
            {{ track }}
          </li>


        </div>
      </article>
    </section>

    <!--SoundCloud iframe-->
    <iframe frameborder="0" allow="autoplay" id="sc-player"
            :src="songSrc"
            @load="iFramePreLoad"></iframe>

    <!--New Song Modal-->
    <div class="modal" :class="newSongModal ? 'is-active' : ''">
      <div class="modal-background" @click.prevent="newSongModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New Song</p>
          <button class="delete" @click.prevent="newSongModal = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="field has-addons">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="New SoundCloud Song" v-model="newUrl">
            </p>
            <p class="control">
              <a class="button is-primary" @click.prevent="playNewSong">
                <span class="icon">
                  <i class="fa fa-play" aria-hidden="true"></i>
                </span>
                <span>Play</span>
              </a>
            </p>
          </div>
          <p class="help is-danger" v-show="newUrlNotPassing">
            Enter a valid https://soundcloud.com url<br>
            Example: https://soundcloud.com/potionrecords/the-magician-together
          </p>
          
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import uri from 'urijs';
  //import VueNouislider from 'vue-nouislider/dist/vue-nouislider.common';
  import io from 'socket.io-client'

  export default {
    name: 'soundcloudwebplayer',
    props: ['url'],
    data() {
      return {
        running: false,
        content: false,
        newSongModal: false,
        user: '',
        message: '',
        messages: [],
        socket: io('localhost:3000'),
        player: '',
        playlist: ['https://soundcloud.com/trndmusik/uberhaupt-auserdem-sunshine-trndmsk'],
        song: {
          cover: '',
          title: '',
          artist: '',
          permalink_url: '',
          description: '',
          created_at: '',
          duration: 0,
          currentPosition: 0,
        },
        newUrl: '',
        newUrlNotPassing: false,
        changePosition: false,
        urlParams: {},
        baseUrl: '',
        progressSlider: {},
      };
    },
    created() {
      // Add EventListener for keyup event to handle space bar press
      window.addEventListener('keyup', this.checkKeyPressed, false);

      let url = uri(window.location.href);
      // save url without parameters
      this.baseUrl = url.protocol() + '://' + url.host() + url.path();
      // Look for a 'url' query parameter
      this.urlParams = url.search(true)
    },
    mounted() {
      // Get the iframe from document and initialize the SouncCloud Widget
      const iFrame = document.getElementById('sc-player');
      this.player = SC.Widget(iFrame);

      // Bind event to get the current position of the song
      this.player
        .bind(SC.Widget.Events.PLAY_PROGRESS, (e) => {
          this.song.currentPosition = e.currentPosition;
      })

      this.$on('newValueSet', (newValue) => {
        this.player.seekTo(newValue[0])
      })

      this.socket.on('MESSAGE', (data) => {
          this.playlist = [...this.playlist, data];
          //this.playlist.push(data)
          // this.messages.push(data)
          console.log(data)
          this.socket.emit('SEND_MESSAGE', {
              added: true
          });
          this.message = ''
      })

    },

    watch: {
      progressBarCurrentPosition: function() {
        this.$emit('updateValue', this.song.currentPosition)
        console.log( this.song.duration - this.song.currentPosition )
        if (this.song.duration - this.song.currentPosition <= 1000){
          this.playlist.shift()
          
          this.playNewSong()
        }
      }
    },

    methods: {
      /**
       * Need to delay getting info
       * for 1 second after iFrame is loaded
       * to prevent async issues
       */
      iFramePreLoad(){
        setTimeout(this.iFrameLoaded, 1000);
      },
      /**
       * Setup the song object if iframe is loaded
       */
      iFrameLoaded() {
        this.content = false;
        this.player.getCurrentSound((song) => {
          this.content = true;
          this.song.cover = song.artwork_url;
          this.song.title = song.title;
          this.song.artist = song.user.username;
          this.song.permalink_url = song.permalink_url;
          this.song.description = song.description;
          this.song.created_at = moment(song.created_at).format('D MMM YYYY - h:mm a');
          this.song.duration = song.duration;
          this.song.currentPosition = 0;
          this.running = false;

          this.progressSlider = {
            config: {
              connect: [true, false],
              range: {
                'min': 0,
                'max': song.duration
              }
            },
            behaviour: 'tap-drag',
            values: [0],
          }
        });
      },
      /**
       * Play the song if it is paused and vice versa
       */
      toggleSong() {
        if (this.running) {
          this.running = false;
          this.player.pause();
        } else {
          this.running = true;
          this.player.play();
        }
      },
      /**
       * Open the Modal for a new Song
       */
      changeSong() {
        this.newSongModal = true;
      },
      /**
       * Check the new song url and load the song if it is valid
       */
      playNewSong() {
        //place soundcloud url from telegramm
        this.newUrl = this.playlist[0]
        console.log(this.newUrl)
        console.log(this.checkUrl(this.newUrl))
        //if (this.checkUrl(this.newUrl) !== null) {
          console.log('after if')
          this.newUrlNotPassing = false;
          this.newSongModal = false;
          this.player.load(this.newUrl);
          setTimeout(() =>{
            console.log('now')
            this.toggleSong()
          }, 3000)
          
        // } else {
        //   this.newUrlNotPassing = true;
        // }
      },
      /**
       * Toggle song if space bar is pressed
       * @param e
       */
      checkKeyPressed(e) {
        if (e.code === "Space") {
          this.toggleSong()
        }
      },
      /**
       * Check if the provided url has the right format
       * @param {string} url - SoundCloud Song Url
       */
      checkUrl(url) {
        const pattern = /^https:\/\/soundcloud\.com\/[a-z1-9-]*\/[a-z1-9-]*\/?$/;

        if (url === undefined) {
          return null
        } else {
          return url.match(pattern)
        }
      },
      // getPlaylist(){
      //   this.$axios.get('http://localhost:3000/playlist').then(response => {
      //     console.log('response: ', response)
      //   }).catch(err => {
      //     console.log('err: ', err)
      //   }) 
      // },
      changed: function(event) {
        this.$store.commit('change', event.target.value)
      }
    },
    computed: {
      songSrc: function () {
        let url = "";

        // Check if url has a url query parameter
        if (this.urlParams.url !== "" && this.checkUrl(this.urlParams.url) !== null) {
          url = this.urlParams.url
        } else {
          url = this.url
        }

        const base = 'https://w.soundcloud.com/player/?url=';
        return base + url;
      },
      prettyDescription: function () {
        return this.song.description.replace(/\n/g, '<br>')
      },
      progressBarCurrentPosition: function () {
        return moment(this.song.currentPosition).format('mm:ss')
      },
      progressBarDuration: function () {
        
        return moment(this.song.duration).format('mm:ss')

      },
    },
    filters: {},
  };
</script>

<style lang="scss" scoped>
  iframe {
    opacity: 0;
    position: absolute;
    left: -9999em;
  }

  .card .content p {
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #progressBarWrapper {
    font-family: 'Roboto Mono', monospace;
  }

  .message-body{
    text-overflow: ellipsis;
    overflow: hidden;
  }

</style>
