<template>
  <div @click="isRemoveModalVisible=true">
    <slot name="representation"></slot>
  </div>

  <RemoveModal :is-modal-visible="isRemoveModalVisible"
               :handled-data="handledData"
               @modal-closed="isRemoveModalVisible = false"
               @remove-confirm-click="onRemoveConfirm"
  />
</template>

<script lang="ts">
import RemoveModal from "@/components/Ui/Actions/Components/Delete/RemoveModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isRemoveModalVisible: false,
    }
  },
  props: {
    handledData: {
      type: Object,
      required: true,
    },
    removeUrl: {
      type: String,
      required: true,
    }
  },
  components: {
    RemoveModal,
  },
  methods: {
    /**
     * @description will remove the data on backend + updates the view
     */
    onRemoveConfirm(): void {
      // todo:
      console.log({
        "what": "remove click",
        "url": this.removeUrl
      });
    },
  }
}
</script>