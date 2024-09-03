<template>
  <button class="left-sidebar-item flex flex-row w-100"
          :class="{
              'hidden-sibling' : !isVisible,
              'open-sibling'   : isVisible
            }"
          @click="$emit('click', $event)"
  >
    <!-- info: not sure if icons will be still present -->
    <div class="icon-wrapper">
      <slot name="icon"></slot>
    </div>

    <span class="title"
          :class="{
            [titleClasses]: true
          }"
    >{{ label }}</span>

    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
         stroke-linejoin="round" class="ml-auto arrow" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"
         @click="$emit('arrowClick', $event)"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
</template>

<script lang="ts">
export default {
  emits: [
    'click',
    'arrowClick'
  ],
  props: {
    titleClasses: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    }
  }
}
</script>