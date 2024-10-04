<template>
  <TopBar @widget-size-change="conf.widgetSize = $event"
          class="mr-0 md:mr-1"
  />
  <div class="flex flex-row flex-wrap">
    <div class="dashboard-big-block"
         v-for="idx in bigBlocks"
         :key="idx"
         :class="{
           [`w-full md:w-1/${conf.widgetSize}`]: true
         }"
    >
    <BigDataDisplayBlock label="test">
      test
    </BigDataDisplayBlock>
    </div>
  </div>
</template>

<script lang="ts">
import TopBar              from "@/views/Dashboard/Components/TopBar.vue";
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import LocalStorageService from "@/scripts/Core/Services/Storage/LocalStorageService";
export default {
  data(): ComponentData {
    return {
      conf: {
        widgetSize: 1,
      },
      bigBlocks: 3,
    }
  },
  components: {
    BigDataDisplayBlock,
    TopBar
  },
  created(): void {
    let savedSize = LocalStorageService.get(LocalStorageService.DASHBOARD_WIDGET_SIZE);
    this.conf.widgetSize = !savedSize ? 1 : parseInt(savedSize);
  }
}
</script>

<style lang="scss">
.dashboard-big-block {
  @apply p-2
}
</style>