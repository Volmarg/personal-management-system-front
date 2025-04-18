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
                :extra-data="extraData"
                @upload-finished="onUploadFinish"
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
import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

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
    },
    extraData: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
    refreshStorageState: {
      type: Boolean,
      default: false,
      required: false,
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
  methods: {
    /**
     * @description will fetch the storage structure after upload is done, not closing dialog on purpose, because
     *              it might turn out that some files upload will fail and user should be able to see which one.
     */
    onUploadFinish(): void {
      if (this.refreshStorageState) {
        StorageState().getAll();
      }
    }
  }
}
</script>
