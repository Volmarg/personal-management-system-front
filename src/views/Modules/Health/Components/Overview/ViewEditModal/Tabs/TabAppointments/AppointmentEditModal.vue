<template>
  <div>
    <Modal :is-visible="showModal"
           id="appointment-edit"
           :title="$t('health.overview.tabs.subTabs.tabs.appointments.editModal.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
           :is-close-full-width="true"
    >
      <template #content>
        <div class="flex justify-center">
          <div class="mt-6 w-full flex flex-col xl:w-1/2">
            <AppointmentCreateEditForm :illness="illness"
                                       :initial-information="appointment.information"
                                       :initial-doctor-id="appointment.doctor.id"
                                       :initial-date="appointment.date"
            />
          </div>
        </div>
      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon :text="$t('health.overview.tabs.subTabs.tabs.appointments.editModal.button.remove.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full md:w-auto"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              background-color-class="bg-red-500"
                              @button-click="$emit('removeClick')"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                     from "@/components/Modal/Modal.vue";
import MediumButtonWithIcon      from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import AppointmentCreateEditForm from "@/views/Modules/Health/Components/Common/AppointmentCreateEditForm.vue";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {SingleContact} from "@/scripts/Core/Types/Modules/Issues";

export default {
  data(): ComponentData {
    return {
      showModal: false,
    }
  },
  props: {
    appointment: {
      type: Object as SingleContact,
      required: true,
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  components: {
    AppointmentCreateEditForm,
    MediumButtonWithIcon,
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "removeClick",
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