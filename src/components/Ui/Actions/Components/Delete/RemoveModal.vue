<template>
  <div>

    <WarningModal :is-visible="showModal"
                  :id="id"
                  :title="$t('generic.action.remove.dialog.header')"
                  @modal-closed="onModalClosed"
                  @confirm="$emit('removeConfirmClick')"
                  :size="modalSize"
    >
      <template #content>
        <p class="text-center">
          {{ $t('components.modal.text.removeRecord') }}
        </p>
      </template>
    </WarningModal>

  </div>
</template>

<script lang="ts">
import WarningModal                 from "@/components/Modal/WarningModal.vue";

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
    id: {
      type: String,
      required: false,
      default: ''
    },
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