<template>
  <div>

    <WarningModal :is-visible="showModal"
                  :title="$t('generic.action.remove.dialog.header')"
                  @modal-closed="onModalClosed"
                  @confirm="onConfirm"
                  :size="modalSize"
    >
      <template #content>
        {{$t('components.modal.text.removeRecord')}}
      </template>
    </WarningModal>

  </div>
</template>

<script lang="ts">
import WarningModal                 from "@/components/Modal/WarningModal.vue";
import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";

import {ComponentData}      from "@/scripts/Vue/Types/Components/types";
import SymfonyTravelsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyTravelsRoutes";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

export default {
  data(): ComponentData {
    return {
      showModal: false,
    }
  },
  props: {
    id: {
      props: Number,
      required: true,
    },
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
  emits: [
    "modalClosed",
    "removeConfirmClick"
  ],
  methods: {
    /**
     * @description removes the entry on backend, triggers events
     */
    async onConfirm(): Promise<void> {
      let response = await this.$moduleCall.remove(SymfonyTravelsRoutes.IDEAS_BASE_URL, this.id, false);
      if (response.success) {
        this.$emit('modalClosed');
        this.$emit('removeConfirmClick');
      }
    },
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