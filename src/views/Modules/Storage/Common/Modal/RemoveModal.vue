<template>
  <div>

    <WarningModal :is-visible="showModal"
                  :title="$t('todo')"
                  @modal-closed="onModalClosed"
                  @confirm="$emit('removeConfirmClick')"
                  :size="modalSize"
    >
      <template #content>
        {{selectedFiles}}
      </template>
    </WarningModal>

  </div>
</template>

<script lang="ts">
import WarningModal                 from "@/components/Modal/WarningModal.vue";
import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  emits: [
    "modalClosed",
    "removeConfirmClick"
  ],
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
    WarningModal,
  },
  mixins: [
    FailedBackendResponseHandler,
    ResponsiveModalSizeMixin,
  ],
  computed: {
    /**
     * @description returns selected files data
     */
    selectedFiles(): Array<Record> {
      return StorageState().selectedFilesData;
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