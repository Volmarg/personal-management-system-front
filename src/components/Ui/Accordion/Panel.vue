<template>
  <li>
    <input type="checkbox" :checked="isChecked" v-model="isChecked">
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
      isChecked: false,
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
  methods: {
    /**
     * @description toggle open state for accordion panel
     */
    toggle(isOpened: boolean): void {
      this.$nextTick(() => {
        this.isChecked = isOpened;
      });
    },
  },
  mounted(): void {
    this.toggle(this.initiallyOpen);
  },
  watch: {
    modelValue(): void {
      this.isChecked = this.modelValue;
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  overflow: visible !important;
}
</style>