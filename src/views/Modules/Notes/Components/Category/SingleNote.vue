<template>
  <div class="flex flex-row">
    <div class="w-full flex items-center justify-start bg-white dark:bg-gray-800 text-blue-500 shadow p-4 cursor-pointer hover:opacity-70"
         @click="isPreviewModalVisible = true"
    >
      <div class="flex-shrink"></div>
      <div class="flex-grow">{{ note.title }}</div>
    </div>

    <div class="lock-button-wrapper">
      <MediumButtonWithIcon :margin-right-class-number="0"
                            :top-wrapper-classes="{
                              'w-full h-full': true,
                            }"
                            button-classes="w-full h-full flex flex-col justify-center !border-r-0"
                            :background-color-class="note.isLocked ? 'bg-red-500' : 'bg-green-500'"
                            @button-click="$emit('toggleLockClick', {id: note.id})"
                            v-tippy="note.isLocked ? $t('notes.category.text.unlock') : $t('notes.category.text.lock')"
      >
        <template #icon>
          <fa icon="lock"
              class="text-2md"
              :is-margin-right="false"
              v-if="note.isLocked"
          />

          <fa icon="lock-open"
              class="text-2md"
              :is-margin-right="false"
              v-else
          />
        </template>
      </MediumButtonWithIcon>
    </div>

    <PreviewNoteModal :is-modal-visible="isPreviewModalVisible"
                       @modal-closed="isPreviewModalVisible = false"
                       :note="note"
                       @update-submit="$emit('updateSubmit')"
                       @delete-click="$emit('deleteClick', $event)"
    />

  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import PreviewNoteModal     from "@/views/Modules/Notes/Components/Category/PreviewNoteModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isPreviewModalVisible: false,
    }
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  components: {
    PreviewNoteModal,
    MediumButtonWithIcon
  },
  emits: [
    'updateSubmit',
    'deleteClick',
    'toggleLockClick',
  ],
}
</script>

<style lang="scss" scoped>
.lock-button-wrapper {
  min-width: 54px;
}
</style>