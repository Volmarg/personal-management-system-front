<template>
  <fa icon="lock"
      class="lock"
      v-if="isLocked"
  />
</template>

<script lang="ts">
export default {
  props: {
    isLocked: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.lock {
  position: absolute;
  left: 10px;
  top: 18px;
  color: red;
  z-index: 9999999;
  transform: scale(0.5)
}
</style>