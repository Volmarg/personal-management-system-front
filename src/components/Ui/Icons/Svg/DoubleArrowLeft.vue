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
    <polyline points="11 17 6 12 11 7"></polyline>
    <polyline points="18 17 13 12 18 7"></polyline>
  </svg>
</template>

<script lang="ts">
export default {
  name: "IconSvgDoubleArrowLeft",
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