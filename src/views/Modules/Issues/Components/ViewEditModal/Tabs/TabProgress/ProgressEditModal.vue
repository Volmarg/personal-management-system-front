<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('issues.pending.modal.viewEdit.tabs.progress.editModal.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <CreateEditProgressForm :initial-information="progress.description"
                                :initial-date="progress.date"
                                :id="progress.id"
                                :header="$t('issues.pending.modal.viewEdit.tabs.progress.form.header.edit')"
        />
      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon :text="$t('issues.pending.modal.viewEdit.tabs.progress.editModal.button.delete.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              :is-mobile-full-width="true"
                              class="mb-1 md:col-start-1 md:col-end-2"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              background-color-class="bg-red-500"
                              @button-click="$emit('removeClick', {progress: progress})"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                  from "@/components/Modal/Modal.vue";
import CreateEditProgressForm from "@/views/Modules/Issues/Components/CreateEditProgressForm.vue";
import MediumButtonWithIcon   from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData}  from "@/scripts/Vue/Types/Components/types";
import {SingleProgress} from "@/scripts/Core/Types/Modules/Issues";

export default {
  data(): ComponentData {
    return {
      showModal: false,
      initialSmallSizeModal: "medium"
    }
  },
  props: {
    progress: {
      type: Object as SingleProgress,
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
    CreateEditProgressForm,
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