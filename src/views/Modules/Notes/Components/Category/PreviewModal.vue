<template>
  <div>
    <Modal :is-visible="showModal"
           :title="(isEdit ? $t('notes.category.previewModal.header.editing.label') : '') + title"
           :size="modalSize"
           :is-close-full-width="true"
           :footer-classes="{
             '!flex-col': isTabletBreakingPoint
           }"
           @modal-closed="onModalClosed"
    >
      <template #content>
        <div class="body"
             v-html="body"
             v-if="!isEdit"
        />

        <Wyswig v-else
                :initial-value="body"
        />

        <CategorySelect v-if="isEdit"
                        :selected="categoryId"
                        :label="$t('notes.category.previewModal.form.category.label')"
        />
      </template>

      <template #footerLeftSection>
        <MediumButtonWithIcon :text="$t('notes.category.previewModal.button.edit.label')"
                              :margin-right-class-number="1"
                              v-if="!isEdit"
                              @button-click="isEdit = true"
                              button-extra-classes="pt-3 pb-3 md:pt-1 md:pb-1"
                              class="w-full md:w-auto ml-2"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
        />

        <MediumButtonWithIcon :text="$t('notes.category.previewModal.button.stopEditing.label')"
                              :margin-right-class-number="1"
                              v-if="isEdit"
                              @button-click="isEdit = false"
                              button-extra-classes="pt-3 pb-3 md:pt-1 md:pb-1"
                              class="w-full md:w-auto ml-2"
                              button-classes="w-full md:w-auto"
                              text-classes="text-center w-full"
        />

        <MediumButtonWithIcon :text="$t('notes.category.previewModal.button.update.label')"
                              :margin-right-class-number="1"
                              v-if="isEdit"
                              @button-click="$emit('updateClick')"
                              button-extra-classes="pt-3 pb-3 md:pt-1 md:pb-1"
                              class="w-full md:w-auto"
                              button-classes="w-full md:w-auto"
                              text-classes="text-center w-full"
        />

        <MediumButtonWithIcon :text="$t('notes.category.previewModal.button.delete.label')"
                              :margin-right-class-number="0"
                              @button-click="$emit('deleteClick')"
                              button-extra-classes="pt-3 pb-3 md:pt-1 md:pb-1"
                              background-color-class="bg-red-500"
                              class="w-full md:w-auto"
                              button-classes="w-full md:w-auto mr-1"
                              text-classes="text-center w-full"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Wyswig                       from "@/components/Form/Wyswig.vue";
import Modal                        from "@/components/Modal/Modal.vue";
import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";
import MediumButtonWithIcon         from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";
import ResponsiveVarsMixin          from "@/mixins/Responsive/ResponsiveVarsMixin.vue";
import CategorySelect               from "@/views/Modules/Notes/Components/CategorySelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: 'medium',
      showModal: false,
      isEdit: false,
    }
  },
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    },
    body: {
      type: String,
      required: true,
    }
  },
  components: {
    MediumButtonWithIcon,
    CategorySelect,
    Wyswig,
    Modal,
  },
  mixins: [
    FailedBackendResponseHandler,
    ResponsiveModalSizeMixin,
    ResponsiveVarsMixin,
  ],
  emits: [
    "modalClosed",
    "addNewClick",
    "updateClick",
    "deleteClick",
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