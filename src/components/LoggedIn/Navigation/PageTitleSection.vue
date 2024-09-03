<template>
  <div class="section-title w-full mb-6 pt-3">
    <div class="flex flex-row items-center justify-between mb-4">
      <div class="flex flex-col">
        <div class="text-xl font-bold">{{ $t(`routes.nameToHeader.${$route.name}`) }} {{ pageTitlePostfix }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {pageStateStore} from "@/scripts/Vue/Store/PageStateStore";

export default {
  name: "PageTitleSection",
  computed: {
    pageTitlePostfix(): string {
      return pageStateStore().pageTitlePostfix;
    }
  }
}
</script>