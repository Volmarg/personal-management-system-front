<template>
  <div class="flex flex-row">
    <div class="w-full flex items-center justify-start bg-white dark:bg-gray-800 text-blue-500 shadow p-4 cursor-pointer hover:opacity-70"
         @click="isPreviewModalVisible = true"
    >
      <div class="flex-shrink"></div>
      <div class="flex-grow">{{ title }}</div>
    </div>

    <div class="lock-button-wrapper">
      <MediumButtonWithIcon :margin-right-class-number="0"
                            :top-wrapper-classes="{
                              'w-full h-full': true,
                            }"
                            button-classes="w-full h-full flex flex-col justify-center !border-r-0"
                            :background-color-class="isLocked ? 'bg-red-500' : 'bg-green-500'"
                            @button-click="toggleLockStateClick"
                            v-tippy="isLocked ? $t('notes.category.text.unlock') : $t('notes.category.text.lock')"
      >
        <template #icon>
          <fa icon="lock"
              class="text-2md"
              :is-margin-right="false"
              v-if="isLocked"
          />

          <fa icon="lock-open"
              class="text-2md"
              :is-margin-right="false"
              v-else
          />
        </template>
      </MediumButtonWithIcon>
    </div>

    <FloatingRoundedPlus class="mb-10"
                         @click="isAddNewModalVisible = true"
                         v-tippy="$t('notes.category.text.addNew')"
    />

    <AddNewModal :is-modal-visible="isAddNewModalVisible"
                 @modal-closed="isAddNewModalVisible = false"
                 @add-new-click="onAddNewClick"
    />

    <PreviewModal :is-modal-visible="isPreviewModalVisible"
                  @modal-closed="isPreviewModalVisible = false"
                  @update-click="onUpdateClick"
                  @delete-click="onDeleteClick"
                  :title="title"
                  :body="body"
                  :category-id="categoryId"
    />

  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FloatingRoundedPlus  from "@/components/Ui/Floating/FloatingRoundedPlus.vue";
import AddNewModal          from "@/views/Modules/Notes/Components/Category/AddNewModal.vue";
import PreviewModal         from "@/views/Modules/Notes/Components/Category/PreviewModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isAddNewModalVisible: false,
      isPreviewModalVisible: false,
    }
  },
  props: {
    isLocked: {
      type: Boolean,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  components: {
    AddNewModal,
    PreviewModal,
    FloatingRoundedPlus,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description handle updating front/backend lock state
     */
    toggleLockStateClick(): void {
      //todo
    },
    onAddNewClick(data: Record): void {
      //todo
    },
    onUpdateClick(data: Record): void {
      //todo
    },
    onDeleteClick(data: Record): void {
      //todo
    }
  }
}
</script>

<style lang="scss" scoped>
.lock-button-wrapper {
  min-width: 54px;
}
</style>