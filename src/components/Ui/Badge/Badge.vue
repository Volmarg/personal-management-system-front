<template>
  <span class="uppercase font-bold inline-flex text-center badge-default text-white rounded-lg text-xs px-2 py-1"
        :class="{
          [backgroundClass]: true
        }"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
export default {
  name: "Badge",
  props: {
    backgroundClass: {
      type: String,
      required: false,
      default: 'bg-blue-500'
    }
  }
}
</script>