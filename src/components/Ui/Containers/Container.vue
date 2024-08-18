<template>
  <div class="p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800"
       :class="{
          'w-full': isForceFullSize
       }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "Container",
  props: {
    isForceFullSize: {
      type     : Boolean,
      default  : true,
      required : false,
    }
  }
}
</script>