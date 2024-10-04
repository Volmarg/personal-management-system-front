<template>
  <div class="dropdown absolute top-0 right-0 mt-8 calendar-view-menu"
       :class="{
          'open': isMenuOpen
       }"
       v-click-away="$emit('menuClose')"
  >
    <div class="dropdown-content w-48 bottom-start">
      <div class="flex flex-col w-full">
        <ul class="list-none">
          <slot></slot>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    "menuClose",
  ],
}
</script>
