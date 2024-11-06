<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('issues.pending.modal.viewEdit.tabs.contacts.editModal.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
           :is-close-full-width="true"
    >
      <template #content>
        <CreateEditContactForm :initial-information="contact.description"
                               :initial-date="contact.date"
                               :id="contact.id"
                               :header="$t('issues.pending.modal.viewEdit.tabs.contacts.form.header.edit')"
        />
      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon :text="$t('issues.pending.modal.viewEdit.tabs.contacts.editModal.button.delete.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full md:w-auto"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              background-color-class="bg-red-500"
                              @button-click="$emit('removeClick', {contact: contact})"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                 from "@/components/Modal/Modal.vue";
import CreateEditContactForm from "@/views/Modules/Issues/Components/CreateEditContactForm.vue";
import MediumButtonWithIcon  from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

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
    contact: {
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
    MediumButtonWithIcon,
    Modal,
    CreateEditContactForm,
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