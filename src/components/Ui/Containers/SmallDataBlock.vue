<template>
  <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800"
       :class="{
        'interactive': isInteractive,
        'fixed-size': !isLargeScreenBreakingPoint && !showElementsInBlock,
        'auto-size': isLargeScreenBreakingPoint && !showElementsInBlock,
        'elements-in-block': showElementsInBlock,
       }"
       @click="$emit('click')"
  >
    <div class="flex flex-row">
      <slot name="outer"></slot>
      <div class="flex flex-row items-center justify-between w-full">
        <div class="flex flex-col w-full">

          <slot>
            <div class="top-line text-2md">
              <slot name="topLine"></slot>
            </div>

            <div class="bottom-line">
              <slot name="bottomLine"></slot>
            </div>

            <slot name="addition"></slot>
          </slot>

        </div>
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

export default {
  props: {
    isInteractive: {
      type: Boolean,
      required: false,
      default: false,
    },
    showElementsInBlock: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mixins: [
    ResponsiveVarsMixin,
  ],
  emits: [
    'click'
  ]
}
</script>

<style lang="scss" scoped>
.top-line {
  @apply uppercase text-left font-bold
}

.bottom-line {
  @apply text-xs text-left text-gray-500
}

.fixed-size {
  $width: 349px !important;
  $height: 90px !important;

  // uncomment when using the show-for-dashboard
  //$height: 95px !important;


  min-width: $width;
  max-width: $width;
  min-height: $height;
  max-height: $height;

  .widget {
    min-width: $width;
    max-width: $width;
    min-height: $height;
    max-height: $height;
  }

  @apply m-2
}

.auto-size {
  @apply w-full lg:w-1/4 my-2
}

.elements-in-block {
  @apply w-full my-2 px-2 lg:w-1/2
}

.interactive {
  @apply cursor-pointer hover:scale-110 transform transition-transform ease-in-out
}
</style>
