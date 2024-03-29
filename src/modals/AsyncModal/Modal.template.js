module.exports = `
<div v-if="modals.length">
  <div class="modal-backdrop" v-if="currModal && currModal.options.backdrop"></div>
  <component v-for="{id, component, props, options} of modals" :is="component" :key="id" ref="modal" v-bind="props" v-show="options.show" @click.native="e => handleBackdrop(e, id, options.backdrop)"></component>
</div>
`;