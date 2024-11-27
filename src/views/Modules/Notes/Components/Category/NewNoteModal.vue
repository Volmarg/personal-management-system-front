<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('notes.common.createUpdateForm.header.create')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <CreateUpdateForm :initial-category="$route.params.id"
                          @submit="$emit('modalClosed')"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal            from "@/components/Modal/Modal.vue";
import CreateUpdateForm from "@/views/Modules/Notes/Components/Note/CreateUpdateForm.vue";

import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: "medium",
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
    CreateUpdateForm,
    Modal,
  },
  mixins: [
    FailedBackendResponseHandler,
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
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>