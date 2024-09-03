<template>
  {{category}}
</template>

<script lang="ts">
import {ComponentData}         from "@/scripts/Vue/Types/Components/types";
import {pageStateStore}        from "@/scripts/Vue/Store/PageStateStore";
import {notesModuleStateStore} from "@/scripts/Vue/Store/NotesModuleState";

import UnmountCleanupAwareMixin from "@/mixins/Awarness/UnmountCleanupAwareMixin.vue";

export default {
  data(): ComponentData {
    return {
      category: []
    }
  },
  mixins: [
    UnmountCleanupAwareMixin
  ],
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