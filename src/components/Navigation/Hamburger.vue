<template>
  <button class="mx-4 navbar-hamburger">
    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
         stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"
         class="hamburger-navbar-element"
    >
      <line x1="3" y1="12" x2="21" y2="12" class="hamburger-navbar-element"></line>
      <line x1="3" y1="6" x2="21" y2="6" class="hamburger-navbar-element"></line>
      <line x1="3" y1="18" x2="21" y2="18" class="hamburger-navbar-element"></line>
    </svg>
  </button>
</template>

<script lang="ts">
export default {
  name: "Hamburger",
}
</script>