module.exports = `
<content>
  <img v-if="type === 'image' && previewMode && !backgroundImageMode" :src="previewSrcLink">
  <a v-if="type === 'image' && !previewMode && !backgroundImageMode" href @click.prevent="openImage"><img :src="previewSrcLink || srcLink"></a>

  <div v-if="type === 'image' && previewMode && backgroundImageMode" class="content-image" :style="{'background-image': 'url(' + previewSrcLink + ')'}"></div>
  <div v-if="type === 'image' && !previewMode && backgroundImageMode" class="content-image" :style="{'background-image': 'url(' + (previewSrcLink || srcLink) + ')'}" @click.prevent="openImage"></div>

  <media-element v-if="type === 'video' && content" :source="content" :preview="previewSrcLink"></media-element>
  <span v-if="type === 'text' && content && !pre" v-html="content"></span>
  <pre v-if="type === 'text' && content && pre" v-html="content"></pre>

  <div class="md-layout" v-if="type === 'file'" style="align-items: center;">
    <div :class="{'md-layout-item': true, 'md-size-10': !previewMode, 'md-size-100': previewMode}"
         :style="{'text-align': previewMode ? 'center' : 'left'}">
      <md-button class="md-icon-button" @click="download()">
        <md-icon class="fas fa-file-download fa-3x"></md-icon>
      </md-button>
    </div>
    <div :class="{'md-layout-item': true, 'md-size-90': !previewMode, 'md-size-100': previewMode}"
         :style="{'text-align': previewMode ? 'center' : 'left'}" v-if="manifestObj">
      <a href @click.prevent="download">
        <pretty-name :name="manifestObj.name"></pretty-name>
      </a>
    </div>
  </div>
</content>
`;