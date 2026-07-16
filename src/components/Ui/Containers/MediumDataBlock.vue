<template>
  <div  class="block"
        :class="{
          'block-fluid': !isStaticSize,
          'block-big': isStaticSize,
       }"
  >
    <div class="w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <!-- top with menu -->
      <div class="flex flex-row items-center justify-between mb-6">
        <div class="flex flex-col text-left">
          <div class="text-lg text-blue-500"><span v-html="title" /></div>
          <div class="mt-1 text-sm text-gray-400"><span v-html="usedDescription" /></div>
        </div>

        <div class="relative">
          <Hamburger @click="onHamburgerClick"
                     v-if="isMenuVisible"
          />
          <slot name="menu"></slot>
        </div>
      </div>

      <div class="w-full">
        <slot name="mainContent"></slot>
        <slot name="additionalContent"></slot>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import Hamburger  from "@/components/Ui/Containers/Components/MediumDataBlock/Hamburger.vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    descMaxChars: {
      type: [Number, null],
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    isMenuVisible: {
      type: Boolean,
      required: false,
      default: true,
    },
    isStaticSize: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    Hamburger,
  },
  emits: [
      'onHamburgerClick'
  ],
  computed: {
    usedDescription(): string {
      if (this.descMaxChars === null) {
        return this.description;
      }

      if (this.description.length < this.descMaxChars) {
        return this.description;
      }

      return this.description.substr(0, this.descMaxChars) + "...";
    },
  },
  methods: {
    onHamburgerClick(): void {
      this.$emit('onHamburgerClick')
    },
  }
}
</script>

<style lang="scss" scoped>
.block {
  @apply p-2
}

.block-fluid {
  @apply w-full xl:w-1/4 lg:w-1/3 md:w-1/2 md:p-2
}

.block-big {
  @apply w-full lg:w-1/2
}
</style>