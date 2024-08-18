<template>
  <svg stroke="currentColor"
       fill="none"
       stroke-width="2"
       viewBox="0 0 24 24"
       stroke-linecap="round"
       stroke-linejoin="round"
       class="stroke-current"
       :color="arrowColor"
       :height="arrowSize"
       :width="arrowSize"
       xmlns="http://www.w3.org/2000/svg">
    <polyline points="13 17 18 12 13 7"></polyline>
    <polyline points="6 17 11 12 6 7"></polyline>
  </svg>
</template>

<script lang="ts">
export default {
  name: "IconSvgDoubleArrowRight",
  props: {
    arrowColor: {
      type: String,
      required: false,
      default: "rgb(55, 65, 81)",
    },
    arrowSize: {
      type: Number,
      required: false,
      default: 16,
    }
  }
}
</script>