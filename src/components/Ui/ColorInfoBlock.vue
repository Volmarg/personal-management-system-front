<template>
  <div
        class="appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline gray-border bg-gray-100 pointer-events-none touch-action-none element"
        :style="{'background-color': colorHex}"
  />
</template>

<script lang="ts">

export default {
  props: {
    colorHex: {
      required: true,
    },
    maxWidth: {
      type: [String, null],
      required: false,
      default: '80px'
    },
  },
}
</script>

<style lang="scss" scoped>
.element {
  $height: 15px;
  max-height: $height !important;
  height: $height !important;

  max-width: v-bind(maxWidth);
}
</style>