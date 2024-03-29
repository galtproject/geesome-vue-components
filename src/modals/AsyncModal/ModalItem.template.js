module.exports = `
<transition :name="transition" @after-enter="$emit('after-enter')" @after-leave="$emit('after-leave')">
  <div class="modal" :id="id" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- header-->
        <div class="modal-header" v-if="$slots.header">
          <slot name="header"></slot>
        </div>
        <div class="modal-header" v-else-if="header"><button class="close" type="button" @click="closeModal">×</button>
          <h4 class="modal-title" v-if="header" v-html="header"></h4>
        </div>
        <!-- body-->
        <slot v-if="$slots.body" name="body"></slot>
        <div class="modal-body" v-else="v-else">
          <slot></slot>
        </div>
        <!-- footer-->
        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
        <div class="modal-footer" v-else-if="footer">
          <div class="btn btn-default" @click="closeModal">{{ cancelText || '取消' }}</div>
          <div class="btn btn-primary" :disabled="disabled" @click="confirmModal">{{ confirmText || '确定' }}</div>
        </div>
      </div>
    </div>
  </div>
</transition>
`;