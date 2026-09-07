<template>
  <div>
    <Modal :is-visible="showModal"
           id="illness-view-edit"
           :title="modalTitle"
           :cancel-text="$t('generic.button.close.label')"
           :size="modalSize"
           @modal-closed="onModalClosed"
    >
      <template #content>
        <div class="flex justify-center">
          <div class="mt-6 w-full flex flex-col xl:w-1/2">
            <DoctorCreateEditForm :id="doctor?.id"
                                  :initial-information="doctor?.information"
                                  :initial-address="doctor?.address"
                                  :initial-specialisation="doctor?.specialisation"
                                  :initial-name="doctor?.name"
                                  :initial-contacts="doctor?.contacts"
                                  @submit="$emit('modalClosed')"
            />
          </div>
        </div>

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                from "@/components/Modal/Modal.vue";
import DoctorCreateEditForm from "@/views/Modules/Health/Components/Common/DoctorCreateEditForm.vue";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      doctorAppointmentStore: null,
      initialSmallSizeModal: "medium",
      showModal: false,
    }
  },
  props: {
    doctor: {
      type: [Object, null],
      required: false,
      default: null,
    },
    modalTitle: {
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
    DoctorCreateEditForm,
    Modal,
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
  },
  watch: {
    isModalVisible() {
      this.showModal = this.isModalVisible;
    }
  }
}
</script>