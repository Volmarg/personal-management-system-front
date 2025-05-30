<template>
  <div>
    <Modal :is-visible="showModal"
           id="idea-edit"
           :title="header"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>

        <AddEditForm :location-data="locationFormData"
                     @submit="this.$emit('formSubmitted')"
        />

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                        from "@/components/Modal/Modal.vue";
import AddEditForm                  from "@/views/Modules/Travel/Ideas/AddEditForm.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: "medium",
      showModal: false,
      locationFormData: {...this.editedData}
    }
  },
  props: {
    editedData: {
      type: [null, Object],
      required: false,
      default: function () {
        return {};
      },
    },
    header: {
      type: String,
      required: true,
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  components: {
    Modal,
    AddEditForm,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "formSubmitted",
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
  watch: {
    editedData(): void {
      this.locationFormData = {...this.editedData};
    }
  }
}
</script>
