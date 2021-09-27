module.exports = `
<modal-item class="large-modal">
  <template slot="header">
    <md-button class="md-icon-button close" @click="cancel">
      <md-icon>clear</md-icon>
    </md-button>
    <h4>
      <div class="modal-title" v-locale="localeKey + '.title'"></div>
    </h4>
  </template>

  <div class="modal-body" slot="body">
    <file-catalog :select-mode="true" :selected-ids.sync="fileCatalogItemsIds"
                  :hide-methods="['choose_uploaded']"></file-catalog>
  </div>

  <template slot="footer">
    <md-button @click="cancel" class="md-raised"><span v-locale="localeKey + '.cancel'"></span></md-button>
    <md-button @click="ok" class="md-raised md-accent" :disabled="!fileCatalogItemsIds.length"><span
        v-locale="localeKey + '.ok'"></span></md-button>
  </template>
</modal-item>
`;