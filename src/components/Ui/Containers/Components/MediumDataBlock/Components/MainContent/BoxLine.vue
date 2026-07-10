<template>
  <p class="box-line">
    <slot></slot>
  </p>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.box-line {
  .label {
    @apply text-gray-800
  }
  .value {
    @apply text-gray-600
  }
  @apply self-start
}
</style>