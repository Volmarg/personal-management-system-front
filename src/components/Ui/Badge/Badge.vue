<template>
  <span class="uppercase font-bold inline-flex text-center badge-default bg-blue-500 text-white rounded-lg text-xs px-2 py-1">
    <slot></slot>
  </span>
</template>

<script lang="ts">
export default {
  name: "Badge"
}
</script>