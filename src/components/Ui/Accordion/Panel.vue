<template>
  <li>
    <input type="checkbox" :checked="!isInitOpen">
    <i></i>
    <h2>
      <slot name="title"></slot>
    </h2>
    <p class="content-wrapper">
      <slot name="content"></slot>
    </p>
  </li>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  name: "AccordionPanel",
  data(): ComponentData {
    return {
      isInitOpen: false,
    }
  },
  props: {
    initiallyOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    initialOpenDelayMs: {
      type: Number,
      required: false,
      default: 0
    }
  },
  mounted(): void {
    setTimeout(() => {
      this.isInitOpen = this.initiallyOpen;
    }, this.initialOpenDelayMs)
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  overflow: visible !important;
}
</style>