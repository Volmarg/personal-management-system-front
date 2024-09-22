<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('todo')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        {{selectedFiles}}
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                        from "@/components/Modal/Modal.vue";
import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {storageModuleState} from "@/scripts/Vue/Store/StorageModuleState";

export default {
  data(): ComponentData {
    return {
      showModal: false,
    }
  },
  props: {
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  components: {
    Modal,
  },
  mixins: [
    FailedBackendResponseHandler,
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "confirmClick",
  ],
  computed: {
    /**
     * @description returns selected files data
     */
    selectedFiles(): Array<Record> {
      return storageModuleState().selectedFilesData;
    }
  },
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>