/*
 * Copyright ©️ 2019 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2019 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import MediaElement from "../../directives/MediaElement/MediaElement";

const {ModalItem} = require('../../modals/AsyncModal');

const clone = require('lodash/clone');
const debounce = require('lodash/debounce');
const isObject = require('lodash/isObject');

export default {
  template: require('./MediaModal.html'),
  props: ['mediaArray', 'startIndex', 'size'],
  components: {
    ModalItem,
    MediaElement
  },
  created() {
    if(this.startIndex) {
      this.currentIndex = this.startIndex;
    }
    this._getActualMediaLinkDebounce = debounce(() => {
      this.getActualMediaLink();
    }, 300);

    this._getActualMediaLinkDebounce();
  },
  methods: {
    async getActualMediaLink() {
      this.loading = true;
      await this.getMediaLinkByIndex(this.currentIndex);
      this.getMediaLinkByIndex(this.currentIndex + 1);
      this.loading = false;

      this.notFound = !this.currentLink;
    },
    async getMediaLinkByIndex(index) {
      if(!this.mediaArray[index]) {
        this.linksArray[index] = null;
        this.loading = false;
        this.notFound = true;
        return;
      }
      this.notFound = false;
      const manifest = isObject(this.mediaArray[index]) ? this.mediaArray[index] : await this.$geesome.getObject(this.mediaArray[index]);

      console.log('manifest', manifest);

      this.infoArray[index] = manifest;

      if( manifest.properties) {
        const mediaContainer = this.$refs.mediaContainer;
        this.heightsArray[index] = Math.round(manifest.properties.height / (manifest.properties.width / mediaContainer.offsetWidth)).toString();
        console.log('this.heightsArray[index]', this.heightsArray[index]);
      }

      if(manifest.mimeType.indexOf('video') !== -1) {
        this.linksArray[index] = await this.$geesome.getContentLink(manifest).catch(() => null);
        this.previewsArray[index] = await this.$geesome.getContentLink(manifest, this.size || 'large').catch(() => null);
      } else {
        this.linksArray[index] = await this.$geesome.getContentLink(manifest, this.size).catch(() => null);
        this.previewsArray[index] = clone(this.linksArray[index]);
      }
      this.infoArray = clone(this.infoArray);
      this.linksArray = clone(this.linksArray);
      this.previewsArray = clone(this.previewsArray);
    },
    setIndex(index) {
      this.currentIndex = index;
      this._getActualMediaLinkDebounce();
    },
    next() {
      this.setIndex((this.currentIndex + 1) >= this.mediaArray.length ? this.currentIndex : this.currentIndex + 1);
    },
    prev() {
      this.setIndex(this.currentIndex <= 0 ? 0 : this.currentIndex - 1);
    },

    async close() {
      this.$root.$asyncModal.close('geesome-media-modal');
    }
  },

  watch: {
    mediaArray() {
      this._getActualMediaLinkDebounce();
    }
  },
  computed: {
    currentLink() {
      return this.linksArray[this.currentIndex];
    },
    nextLink() {
      return this.linksArray[this.currentIndex + 1];
    },
    currentInfo() {
      return this.infoArray[this.currentIndex];
    },
    currentPreview() {
      return this.previewsArray[this.currentIndex];
    }
  },
  data() {
    return {
      currentIndex: 0,
      linksArray: [],
      previewsArray: [],
      infoArray: [],
      heightsArray: [],
      loading: true,
      notFound: false
    }
  }
}
