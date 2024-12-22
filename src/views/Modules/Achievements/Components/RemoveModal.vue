<template>
  <div>

    <WarningModal :is-visible="showModal"
                  :size="modalSize"
                  :title="$t('achievements.list.modal.remove.header')"
                  @modal-closed="onModalClosed"
                  @confirm="$emit('removeConfirmClick')"
    >
      <template #content>
        {{$t('achievements.list.modal.remove.description')}}
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
    achievementData: {
      type: Object,
      required: true,
    },
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