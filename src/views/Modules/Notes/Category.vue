<template>
  <div class="notes-wrapper">
    <SingleNote v-for="note in notes"
                :key="note.id"
                :note="note"
                class="single-note"
                @update-submit="refreshPage"
                @delete-click="onDelete"
                @toggle-lock-click="onToggleLock"
    />
  </div>

  <FloatingRoundedPlus class="mb-10"
                       @click="isAddNewModalVisible = true"
                       v-tippy="$t('notes.category.text.addNew')"
  />

  <NewNoteModal :is-modal-visible="isAddNewModalVisible"
                 @modal-closed="isAddNewModalVisible = false"
  />

</template>

<script lang="ts">
import {ComponentData}  from "@/scripts/Vue/Types/Components/types";
import {pageStateStore} from "@/scripts/Vue/Store/PageStateStore";

import SingleNote          from "@/views/Modules/Notes/Components/Category/SingleNote.vue";
import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";
import NewNoteModal        from "@/views/Modules/Notes/Components/Category/NewNoteModal.vue";

import UnmountCleanupAwareMixin from "@/mixins/Awarness/UnmountCleanupAwareMixin.vue";

import SymfonyNotesRoutes from "@/router/SymfonyRoutes/Modules/SymfonyNotesRoutes";

export default {
  data(): ComponentData {
    return {
      isAddNewModalVisible: false,
      category: {},
      canRefresh: true,
      notes: []
    }
  },
  mixins: [
    UnmountCleanupAwareMixin
  ],
  components: {
    NewNoteModal,
    FloatingRoundedPlus,
    SingleNote
  },
  methods: {
    /**
     * @description sets the category name as the page title postfix
     */
    setPageTitleCategory(): void {
      pageStateStore().pageTitlePostfix = this.category.name;
    },
    /**
     * @description fetches categories / notes data so that the page state can be refreshed
     */
    async refreshPage(): Promise<void> {
      if (!this.canRefresh) {
        return;
      }

      this.canRefresh = false;

      this.category = await this.$moduleCall.get(SymfonyNotesRoutes.NOTES_CATEGORIES_BASE_URL, this.$route.params.id);
      this.notes    = await this.$moduleCall.getAll(SymfonyNotesRoutes.NOTES_BASE_URL, this.$route.params.id);
      this.setPageTitleCategory();

      /**
       * @description nextTick is needed else update hook will end in endless loop
       */
      this.$nextTick(() => {
        this.canRefresh = true;
      })
    },
    /**
     * @description removes the entry on backend and refreshes page state
     */
    onDelete(data: Record): void {
      this.$moduleCall.remove(SymfonyNotesRoutes.NOTES_BASE_URL, data.id, false);
      this.refreshPage();
    },
    /**
     * @description add / remove lock on backend + refresh page state
     */
    async onToggleLock(data: Record): Promise<void> {
      await this.$moduleCall.toggleLock(SymfonyNotesRoutes.NOTES_BASE_URL, data.id);
      this.refreshPage();
    },
  },
  beforeMount(): void {
    this.refreshPage();
  },
  updated(): void {
    this.refreshPage();
  },
}
</script>

<style lang="scss" scoped>
.notes-wrapper {
  @apply mt-10
}

.single-note {
  @apply text-left
}

.single-note + .single-note {
  @apply mt-2
}
</style>