<template>
  <div class="modal-wrapper">
    <Modal :title="$t('uploadDialog.header')"
           :is-visible="isVisible"
           @modal-closed="$emit('modalClosed')"
           :size="dialogSize"
           :is-close-full-width="true"
    >
      <template #content>

        <Upload :configuration-id="configurationId"
                @upload-finished="$emit('uploadFinished', $event)"
        />

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">

import Modal  from "@/components/Modal/Modal.vue";
import Upload from "@/components/Ui/Upload/Component/Upload.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

export default {
  props: {
    configurationId: {
      type     : String,
      required : true,
    },
    isVisible: {
      type     : Boolean,
      required : false,
      default  : false,
    }
  },
  emits: [
    'uploadFinished'
  ],
  components: {
    Upload,
    Modal,
  },
  mixins: [
    ResponsiveVarsMixin,
  ],
  computed: {
    /**
     * @description will decide size of the dialog
     */
    dialogSize(): string {
      return (this.isPhoneBreakingPoint ? 'full' : 'medium');
    }
  }
}
</script>
