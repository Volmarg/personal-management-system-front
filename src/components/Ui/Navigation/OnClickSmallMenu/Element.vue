<template>
  <li class="menu-element">
    <slot></slot>
  </li>
</template>
<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
.menu-element {
  @apply flex flex-row items-center justify-start h-10 w-full px-2 bg-white hover:bg-gray-100
}
</style>

<style lang="scss">
.menu-element * {
  @apply text-left w-full cursor-pointer
}
</style>