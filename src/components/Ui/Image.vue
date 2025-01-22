<template>
  <img :src="path" />
</template>

<script lang="ts">
export default {
  props: {
    width: {
      type: String,
      required: false,
      default: '100px',
    },
    path: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: v-bind(width);
  max-width: v-bind(width);
}
</style>