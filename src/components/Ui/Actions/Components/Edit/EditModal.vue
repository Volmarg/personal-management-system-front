<template>
  <div>
    <Modal :is-visible="showModal"
           :id="id"
           :title="$t('generic.action.edit.dialog.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <slot name="form"></slot>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from "@/components/Modal/Modal.vue";

import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      showModal: false,
      initialSmallSizeModal: "medium"
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
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "formSubmit",
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
  },
}
</script>