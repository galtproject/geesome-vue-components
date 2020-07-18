/*
 * Copyright ©️ 2019 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2019 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import MediaElement from "../MediaElement/MediaElement";
import PrettyName from "../PrettyName/PrettyName";
import ImageModal from "../../modals/MediaModal/MediaModal";

const fileSaver = require('file-saver');
const mime = require('mime/lite');
const last = require('lodash/last');
const startsWith = require('lodash/startsWith');
const ipfsHelper = require('geesome-libs/src/ipfsHelper');

export default {
  template: require('./ContentManifestItem.html'),
  props: ['manifest', 'dbId', 'previewMode', 'backgroundImageMode'],
  components: {MediaElement, PrettyName, ImageModal},
  async created() {
    this.setContent();
  },

  async mounted() {

  },

  methods: {
    setContent() {
      if (this.dbId) {
        this.setContentByDbId();
      } else {
        this.setContentByManifest();
      }
    },
    async setContentByDbId() {
      this.loading = true;
      const dbContent = await this.$geesome.getDbContent(this.dbId);
      const manifestObj = await this.$geesome.getObject(dbContent.manifestStorageId);
      this.setContentByManifest(manifestObj);
    },
    async setContentByManifest(manifestObj) {
      this.loading = true;

      this.content = null;
      this.srcLink = null;
      this.previewSrcLink = null;

      if (manifestObj) {
        this.manifestObj = manifestObj;
      } else if (ipfsHelper.isIpldHash(this.manifest)) {
        this.manifestObj = await this.$geesome.getObject(this.manifest);
      } else if (this.manifest && this.manifest['/']) {
        this.manifestObj = await this.$geesome.getObject(this.manifest['/']);
      } else {
        this.manifestObj = this.manifest;
      }

      if(!this.manifestObj) {
        return;
      }

      this.srcLink = await this.$geesome.getContentLink(this.manifestObj.storageId);
      this.previewSrcLink = await this.$geesome.getContentLink(this.manifestObj.preview ? this.manifestObj.preview.medium.storageId : null);

      if (this.type === 'text') {
        let content = await this.$geesome.getContentData(this.contentId);
        this.content = content.split(' ').map(t => t.replace(/^(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.#-]*(\?\S+)?)?)?)/ig, "<a href=\"$1\" target=\"_blank\">$1</a>")).join(' ');
      }
      if (this.type === 'image' || this.type === 'video' || this.type === 'audio' || this.type === 'file') {
        this.content = this.srcLink + '.' + this.manifestObj.extension;
      }
      this.loading = false;
    },
    download() {
      fileSaver.saveAs(this.srcLink, this.filename);
    },
    openImage() {
      this.$root.$asyncModal.open({
        id: 'image-modal',
        component: ImageModal,
        props: {'images': [this.srcLink]},
        options: {closeOnBackdrop: true}
      });
    }
  },

  watch: {
    type() {
      this.setContent();
    },
    manifest() {
      this.setContent();
    },
    dbId() {
      this.setContentByDbId();
    }
  },

  computed: {
    filename() {
      return last(this.srcLink.split('/')) + '.' + this.extension;
    },
    extension() {
      if (!this.manifestObj) {
        return null;
      }
      return this.manifestObj.extension || mime.getExtension(this.manifestObj.mimeType) || '';
    },
    type() {
      if (!this.manifestObj) {
        return null;
      }
      if (startsWith(this.contentType, 'image')) {
        return 'image';
      }
      if (startsWith(this.contentType, 'text')) {
        return 'text';
      }
      if (startsWith(this.contentType, 'video')) {
        return 'video';
      }
      if (startsWith(this.contentType, 'audio')) {
        return 'audio';
      }
      return 'file';
    },
    contentType() {
      return this.previewMode && this.manifestObj.preview ? this.manifestObj.preview.medium.mimeType : this.manifestObj.mimeType;
    },
    contentId() {
      return this.previewMode && this.manifestObj.preview ? this.manifestObj.preview.medium.storageId : this.manifestObj.storageId;
    }
  },
  data() {
    return {
      manifestObj: null,
      content: '',
      previewSrcLink: null,
      srcLink: null
    }
  },
}
