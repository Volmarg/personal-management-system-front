<template>
  <div class="w-full lg:w-1/4">
    <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-col">
          <div class="text-xs uppercase font-light text-gray-500">{{ label }}</div>
          <div class="text-xl font-bold text-left lg:text-center">{{ value }}</div>
        </div>
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }
}
</script>