<template>
  <div @click="isRemoveModalVisible=true">
    <slot name="representation"></slot>
  </div>

  <teleport to="body">
    <RemoveModal :is-modal-visible="isRemoveModalVisible"
                 :handled-data="handledData"
                 @modal-closed="isRemoveModalVisible = false"
                 @remove-confirm-click="onRemoveConfirm"
                 ref="modal"
    />
  </teleport>
</template>

<script lang="ts">
import RemoveModal from "@/components/Ui/Actions/Components/Delete/RemoveModal.vue";

import ActionMixin from "@/components/Ui/Actions/Mixin/ActionMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isRemoveModalVisible: false,
    }
  },
  props: {
    recordId: {
      type: Number,
      required: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
  },
  mixins: [
    ActionMixin,
  ],
  components: {
    RemoveModal,
  },
  methods: {
    /**
     * @description will remove the data on backend + updates the view
     */
    async onRemoveConfirm(): Promise<void> {
      this.validateStoreFetchConf();
      await this.$moduleCall.remove(this.baseUrl, this.recordId, !this.useStoreFetch);
      if (this.useStoreFetch) {
        this.fetchStoreData();
        this.$refs.modal.onModalClosed();
      }
    },
  }
}
</script>