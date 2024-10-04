<template>
  <div class="bar-wrapper">
    <div class="absolute top-0 w-full bg-blue-500 text-white"
         :style="{
            'width': `${usedPercentage}%`
         }"
     >
      <span>
        {{ usedPercentage }}%
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      usedPercentage: 0,
    }
  },
  props: {
    percent: {
      type: Number,
      required: true,
    }
  },
  created(): void {
    this.usedPercentage = ((this.percent > 100) ? 100 : this.percent);
  }
}
</script>

<style lang="scss" scoped>
.bar-wrapper {
  $missingColor: rgb(229 231 235);
  background-color: $missingColor;
  height:16px;
  @apply relative flex flex-row w-full text-center text-xs items-center
}
</style>