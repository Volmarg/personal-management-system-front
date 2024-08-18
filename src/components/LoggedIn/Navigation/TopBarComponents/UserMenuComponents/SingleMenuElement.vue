<template>
  <li class="dropdown-item">
    <router-link :to="toPath"
                 class="flex flex-row items-center justify-start h-10 w-full px-2"
    >
      <slot name="icon"></slot>
      <span class="mx-2">{{ label }}</span>
    </router-link>

  </li>
</template>

<script lang="ts">

export default {
  name: "UserMenuSingleElement",
  props: {
    toPath: {
      type     : String,
      required : true,
    },
    label: {
      type     : String,
      required : true,
    }
  },
}
</script>