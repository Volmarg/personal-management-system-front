<template>
  <div>
    <WarningModal :is-visible="showModal"
           :title="$t('issues.pending.modal.viewEdit.tabs.contacts.removeModal.header')"
           @modal-closed="onModalClosed"
           @confirm="onConfirm"
           :size="modalSize"
    >
      <template #content>
        {{$t('issues.pending.modal.viewEdit.tabs.contacts.removeModal.text')}}
      </template>

    </WarningModal>
  </div>
</template>

<script lang="ts">
import WarningModal from "@/components/Modal/WarningModal.vue";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {SingleContact} from "@/scripts/Core/Types/Modules/Issues";

import SymfonyIssuesRoutes from "@/router/SymfonyRoutes/Modules/SymfonyIssuesRoutes";

export default {
  data(): ComponentData {
    return {
      showModal: false,
    }
  },
  props: {
    contact: {
      type: Object as SingleContact,
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
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
  ],
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
    /**
     * @description handle contact removal
     */
    async onConfirm(): Promise<void> {
      let response = await this.$moduleCall.remove(SymfonyIssuesRoutes.ISSUE_CONTACT_BASE_URL, this.contact.id);
      if (response.success) {
        this.$emit('modalClosed');
      }
    }
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>