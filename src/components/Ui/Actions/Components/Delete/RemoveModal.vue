<template>
  <div>

    <WarningModal :is-visible="showModal"
                  :title="$t('generic.action.remove.dialog.header')"
                  @modal-closed="onModalClosed"
                  @confirm="$emit('removeConfirmClick')"
                  :size="modalSize"
    >
      <template #content>

      </template>
    </WarningModal>

  </div>
</template>

<script lang="ts">
import WarningModal                 from "@/components/Modal/WarningModal.vue";
import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

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
    },
    handledData: {
      type: Object,
      required: true,
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