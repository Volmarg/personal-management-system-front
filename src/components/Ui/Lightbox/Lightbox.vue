<template>
  <VueEasyLightbox
      :visible="isVisible"
      @hide="$emit('hide')"
      :imgs="images"
  />
</template>

<script lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isVisible: false,
    }
  },
  props: {
    forceIsVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
    images: {
      type: Array,
      required: true,
    }
  },
  emits: [
    "hide"
  ],
  components: {
    VueEasyLightbox
  },
  created(): void {
    this.isVisible = this.forceIsVisible;
  },
  watch: {
    forceIsVisible(): void {
      this.isVisible = this.forceIsVisible;
    }
  }
}
</script>
