<template>
  {{category}}
  <div class="notes-wrapper">
    <SingleNote v-for="note in notes"
                :key="JSON.stringify(note)"
                :title="note.title"
                :body="note.body"
                :category-id="note.categoryId"
                :is-locked="note.isLocked"
                class="single-note"
    />
  </div>
</template>

<script lang="ts">
import {ComponentData}         from "@/scripts/Vue/Types/Components/types";
import {pageStateStore}        from "@/scripts/Vue/Store/PageStateStore";
import {notesModuleStateStore} from "@/scripts/Vue/Store/NotesModuleState";

import SingleNote               from "@/views/Modules/Notes/Components/Category/SingleNote.vue";
import UnmountCleanupAwareMixin from "@/mixins/Awarness/UnmountCleanupAwareMixin.vue";

export default {
  data(): ComponentData {
    return {
      category: {},
      notes: [
        {
          categoryId: 1,
          title: "Note 1",
          body: "<b>Body1</b>",
          isLocked: false
        },
        {
          categoryId: 3,
          title: "Note 2",
          body: "<b>Body2</b><br><hr>",
          isLocked: true
        }
      ]
    }
  },
  mixins: [
    UnmountCleanupAwareMixin
  ],
  components: {
    SingleNote
  },
  methods: {
    /**
     * @description sets the category name as the page title postfix
     */
    setPageTitleCategory(): void {
      this.category = notesModuleStateStore().findCategory(this.$route.params.id)
      pageStateStore().pageTitlePostfix = this.category.name;
    }
  },
  mounted(): void {
    this.setPageTitleCategory();
  },
  updated(): void {
    this.setPageTitleCategory();
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