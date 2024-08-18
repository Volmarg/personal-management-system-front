<template>
  <div class="section-title w-full mb-6 pt-3">
    <div class="flex flex-row items-center justify-between mb-4">
      <div class="flex flex-col">
        <div class="text-xl font-bold">{{ $t(`routes.nameToHeader.${$route.name}`) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageTitleSection",
}
</script>