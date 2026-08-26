<template>
  <div>
    <WarningModal :is-visible="showModal"
           id="illness-remove"
           :title="$t('health.overview.tabs.subTabs.tabs.illness.modal.remove.header')"
           @modal-closed="onModalClosed"
           @confirm="onConfirm"
           :size="modalSize"
    >
      <template #content>
        <div class="text-center mt-4">
          <p>
            {{ $t('health.overview.tabs.subTabs.tabs.illness.modal.remove.text.removeAppointmentLine1') }}
          </p>
          <b class="mt-1 block">
            {{ $t('health.overview.tabs.subTabs.tabs.illness.modal.remove.text.removeAppointmentLine2') }}
          </b>
          <i class="mt-4 block text-sm">
            {{ $t('health.overview.tabs.subTabs.tabs.illness.modal.remove.text.removeAppointmentLine3') }}
          </i>
        </div>

      </template>

    </WarningModal>
  </div>
</template>

<script lang="ts">
import WarningModal from "@/components/Modal/WarningModal.vue";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyHealthRoutes from "@/router/SymfonyRoutes/Modules/SymfonyHealthRoutes";

import {IllnessStore}           from "@/scripts/Vue/Store/Module/Health/IllnessStore";
import {DoctorAppointmentStore} from "@/scripts/Vue/Store/Module/Health/AppointmentStore";

export default {
  data(): ComponentData {
    return {
      showModal: false,
    }
  },
  props: {
    illness: {
      type: Object,
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
     * @description handle illness removal
     */
    async onConfirm(): Promise<void> {
      let response = await this.$moduleCall.remove(SymfonyHealthRoutes.HEALTH_ILLNESS_BASE_URL, this.illness.id, false);
      if (response.success) {
        this.$emit('modalClosed');
        IllnessStore().getAll();
        DoctorAppointmentStore().getAll();
      }
    }
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>