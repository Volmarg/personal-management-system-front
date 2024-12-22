<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('achievements.list.modal.edit.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <AddEditForm :id="achievementData?.id"
                     :name="achievementData?.name"
                     :description="achievementData?.description"
                     :type="achievementData?.type"
                     v-if="showModal"
                     @submit="$emit('confirmClick')"
        />
      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon :text="$t('achievements.list.modal.edit.button.remove.label')"
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
import AddEditForm                  from "@/views/Modules/Achievements/Components/AddEditForm.vue";
import Modal                        from "@/components/Modal/Modal.vue";
import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData}              from "@/scripts/Vue/Types/Components/types";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

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
    },
    achievementData: {
      type: Object,
      required: true,
    },
  },
  components: {
    MediumButtonWithIcon,
    AddEditForm,
    Modal,
  },
  mixins: [
    FailedBackendResponseHandler,
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "confirmClick",
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