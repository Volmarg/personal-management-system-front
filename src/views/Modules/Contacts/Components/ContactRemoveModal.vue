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

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";
import SymfonyContactsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyContactsRoutes";

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
    identifier: {
      type: Number,
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
  methods: {
    /**
     * @description removes entry on backend and closes the modal
     */
    async onConfirm(): Promise<void> {
      await this.$moduleCall.remove(SymfonyContactsRoutes.CONTACTS_BASE_URL, this.identifier, false);
      this.$emit('removeConfirmClick');
      this.$emit('modalClosed');
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