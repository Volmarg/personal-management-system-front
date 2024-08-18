<template>
  <div class="button hover:opacity-70 cursor-pointer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
  .button {
    $size: 40px;

    width: $size;
    height: $size;
    @apply border border-gray-700 rounded-md flex justify-center
  }

  .button * {
    @apply self-center
  }
</style>