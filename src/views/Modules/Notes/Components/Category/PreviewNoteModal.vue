<template>
  <div>
    <Modal :is-visible="showModal"
           id="note-preview"
           :title="(isEdit ? $t('notes.category.previewModal.header.editing.label') : '') + note.title"
           :size="modalSize"
           :is-close-full-width="true"
           :footer-classes="{
             '!flex-col': isTabletBreakingPoint
           }"
           @modal-closed="onModalClosed"
    >
      <template #content>
        <div class="note-body-preview"
             v-html="note.body"
             v-if="!isEdit"
        />
        <CreateUpdateForm v-else
                          :initial-body="note.body"
                          :initial-category="note.categoryId"
                          :initial-title="note.title"
                          :id="note.id"
                          :is-edit="true"
                          :show-submit="false"
                          ref="form"
        />

      </template>

      <template #footerLeftSection>
        <MediumButtonWithIcon :text="$t('notes.new.form.submit.label')"
                              :margin-right-class-number="0"
                              @button-click="$refs.form.submit(); $emit('updateSubmit')"
                              button-extra-classes="pt-3 pb-3 md:pt-1 md:pb-1"
                              class="w-full md:w-auto"
                              button-classes="w-full md:w-auto mr-1"
                              text-classes="text-center w-full"
                              v-if="isEdit"
        />

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

        <MediumButtonWithIcon :text="$t('notes.category.previewModal.button.delete.label')"
                              :margin-right-class-number="0"
                              @button-click="$emit('deleteClick', {id: note.id})"
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
import Modal                from "@/components/Modal/Modal.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import CreateUpdateForm     from "@/views/Modules/Notes/Components/Note/CreateUpdateForm.vue";

import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";
import ResponsiveVarsMixin          from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      showModal: false,
      isEdit: false,
    }
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    },
  },
  components: {
    MediumButtonWithIcon,
    CreateUpdateForm,
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
    ResponsiveVarsMixin,
  ],
  emits: [
    "modalClosed",
    "addNewClick",
    "deleteClick",
    "updateSubmit",
  ],
  computed: {
    /**
     * @description decide modal size depending if edit is on
     */
    dynamicModalSize(): string {
      return this.isEdit ? 'full' : 'medium';
    },
  },
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

<style lang="scss">
.note-body-preview {
  @import 'src/assets/scss/libs/tinymce/content-outside-editor';

  @apply max-h-96 overflow-y-scroll
}
</style>