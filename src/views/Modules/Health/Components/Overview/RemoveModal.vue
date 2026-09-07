<template>
  <div>
    <WarningModal :is-visible="showModal"
           id="doctor-remove"
           :title="$t('health.overview.tabs.doctors.modal.remove.header')"
           @modal-closed="onModalClosed"
           @confirm="$emit('removeConfirmClick')"
           :size="modalSize"
    >
      <template #content>
        {{$t('health.overview.tabs.doctors.modal.remove.text.line1')}}
      </template>
    </WarningModal>

  </div>
</template>

<script lang="ts">
import WarningModal from "@/components/Modal/WarningModal.vue";

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
    }
  },
  components: {
    WarningModal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
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