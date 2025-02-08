<template>
  <div class="modal-wrapper">
    <Modal :title="$t('generic.dialog.uploadDialog.header')"
           :is-visible="isVisible"
           @modal-closed="$emit('modalClosed')"
           :size="modalSize"
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

import ResponsiveVarsMixin      from "@/mixins/Responsive/ResponsiveVarsMixin.vue";
import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: 'medium',
    }
  },
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
    ResponsiveModalSizeMixin,
  ],
}
</script>
