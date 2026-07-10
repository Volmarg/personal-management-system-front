<template>
  <div class="box-content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.box-content {
  min-height: 150px;
  @apply flex flex-col w-full
}

</style>