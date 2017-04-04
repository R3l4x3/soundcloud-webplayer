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
          <div class="level">
            <div class="level-item is-narrow has-text-centered">
              <span>{{progressBarCurrentPosition}}</span>
            </div>
            <div class="level-item has-text-centered" id="progressBar" style="padding: 0 10px;">
              <progress class="progress" :value="song.currentPosition" :max="song.duration"></progress>
            </div>
            <div class="level-item is-narrow has-text-centered">{{progressBarDuration}}</div>
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
      </footer>
    </div>

    <!--SoundCloud iframe-->
    <iframe frameborder="0" id="sc-player"
            :src="songSrc"
            @load="iFrameLoaded"></iframe>

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
              <a class="button is-info" @click.prevent="playNewSong">
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

  export default {
    name: 'soundcloudwebplayer',
    props: ['url'],
    data() {
      return {
        running: false,
        content: false,
        newSongModal: false,
        player: '',
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
      };
    },
    created() {
      // Add EventListener for keyup event to handle space bar press
      window.addEventListener('keyup', this.checkKeyPressed, false);
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
    },
    methods: {
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
        let urlMatch = this.newUrl.match(/^https:\/\/soundcloud\.com\/[a-z1-9\/-]*/)
        if (urlMatch !== null) {
          this.newUrlNotPassing = false;
          this.newSongModal = false;
          this.player.load(this.newUrl);
        } else {
          this.newUrlNotPassing = true;
        }
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
    },
    computed: {
      songSrc: function () {
        const base = 'https://w.soundcloud.com/player/?url=';
        return base + this.url;
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

  .level-item {
    font-family: 'Roboto Mono', monospace;
  }

</style>
