module.exports = `
<modal-item class="large-modal geesome-media-modal">
  <template slot="header">
    <md-button class="md-icon-button close" @click="close">
      <md-icon>clear</md-icon>
    </md-button>
  </template>

  <div class="modal-body" slot="body">
    <div class="background" @click="close"></div>

    <div class="media-container" ref="mediaContainer">
      <div v-if="notFound">Not found</div>

      <div class="media-content" :style="{'max-height': heightsArray[currentIndex] + 'px'}">
        <img v-if="currentInfo && currentInfo.mimeType.indexOf('image') !== -1" class="media-image" :src="(linksArray ? currentLink : 'undefined')"/>
        <div v-if="currentInfo && currentInfo.mimeType.indexOf('video') !== -1" class="media-video">
          <media-element v-if="currentLink && currentPreview" :source="currentLink + '.' + currentInfo.extension" :preview="currentPreview" :autoplay="true" :height="heightsArray[currentIndex] + 'px'"></media-element>
        </div>

        <div class="slider-controls" v-if="mediaArray.length > 1">
          <button class="left-arrow" @click.prevent.stop="prev()" v-if="mediaArray[currentIndex - 1]"></button>
          <button class="right-arrow" @click.prevent.stop="next()" v-if="mediaArray[currentIndex + 1]"></button>
          <div class="dots" v-if="mediaArray">
            <button v-for="(mediaItem, index) in mediaArray" v-if="index < 12" @click.prevent.stop="setIndex(index)"
                    :class="{'active': index === currentIndex}"></button>
          </div>
        </div>
      </div>

      <img v-if="nextLink" class="next-preview" :src="nextLink">
    </div>
  </div>
</modal-item>
`;