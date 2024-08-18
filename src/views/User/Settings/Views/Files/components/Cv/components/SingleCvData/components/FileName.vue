<template>
  <div class="name">
    {{ name }}
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type     : String,
      required : true,
    }
  }
}
</script>

<style lang="scss" scoped>
.name {
  @apply text-sm text-center sm:text-left mb-2 sm:mb-0
}
</style>