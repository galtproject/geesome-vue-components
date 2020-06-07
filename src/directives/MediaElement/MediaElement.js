/*
 * Copyright ©️ 2019 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2019 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import 'mediaelement';

export default {
  name: 'media-element',
  template: require('./MediaElement.html'),
  props: {
    source: {
      type: String,
      required: true,
      default: ''
    },
    preview: {
      type: String,
      required: false,
      default: ''
    },
    width: {
      type: String,
      required: false,
      default: 'auto'
    },
    height: {
      type: String,
      required: false,
      default: 'auto'
    },
    preload: {
      type: String,
      required: false,
      default: 'none'
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: false
    },
    forceLive: {
      type: Boolean,
      required: false,
      default: true
    },
    success: {
      type: Function,
      default() {
        return false;
      }
    },
    error: {
      type: Function,
      default() {
        return false;
      }
    }
  },
  data: () => ({
    refresh: false,
    player: null,
  }),
  mounted() {
    const {MediaElementPlayer} = window;
    // window.flvjs = flvjs;
    // window.Hls = hlsjs;
    const componentObject = this;
    if(!this.$el) {
      return console.warn('this.$el not found, MediaElementPlayer not initialized');
    }
    this.player = new MediaElementPlayer(this.$el, {
      // renderers: [''],
      pluginPath: 'build/',
      shimScriptAccess: 'always',
      // forceLive: this.forceLive,
      poster: this.preview,
      preload: 'metadata',
      // (by default, this is set as `sameDomain`)
      // shimScriptAccess: 'always',
      success: (mediaElement, originalNode, instance) => {
        // console.log('success', mediaElement, componentObject.source);
//
        mediaElement.addEventListener('rendererready', function(e) {
          mediaElement.parentElement.parentElement.querySelectorAll('.mejs__overlay-play .mejs__overlay-button')[0].addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            instance.play();
          });
          if (componentObject.autoplay) {
            instance.play();
          }
        });

        instance.setSrc(componentObject.source);

        this.success(mediaElement, originalNode, instance);
      },
      error: (e) => {
        this.error(e);
      }
    });
  },
  methods: {
    Features(key) {
      const {mejs} = window;
      return mejs.Features[key];
    },
    remove() {
      if(this.player) {
        this.player.remove();
      }
    }
  },
  beforeDestroy() {
    this.remove();
  },
  watch: {
    source: function (newSource) {
      // console.log('source new', newSource);
      // console.log('source old', oldSource);
      this.player.setSrc(newSource);
      this.player.setPoster('');
      this.player.load();
    },
    forceLive: function (newForceLive, oldForceLive) {
      if (newForceLive === oldForceLive) {
        return;
      }
      this.player.options.forceLive = newForceLive;
    }
  },
};
