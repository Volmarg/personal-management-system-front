<template>
  <a :href="href"
     class="menu-item blue"
  >
    <slot name="icon"></slot>
  </a>
</template>

<script lang="ts">
export default {
  props: {
    href: {
      type     : String,
      required : false,
      default  : "#"
    }
  }
}
</script>