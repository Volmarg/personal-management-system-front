<template>
  <button class="mx-4 navbar-hamburger"
          @click="onHamburgerClick"
  >
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
import {navigationStore} from "@/scripts/Vue/Store/NavigationStore";

export default {
  name: "Hamburger",
  methods: {
    /**
     * @description check if logged-in sidebar nav is collapsed or not
     */
    isSidebarCollapsed(): boolean {
      let domElement = document.querySelector('[data-collapsed]') as Element;
      return (domElement?.getAttribute('data-collapsed') === "true");
    },
    /**
     * @description when clicking on hamburger record the incoming/new sidebar state (that's why we negate),
     */
    onHamburgerClick(): void {
      navigationStore().isSidebarCollapsed = !this.isSidebarCollapsed();
    },
  },
  /**
   * @description is a must because we must catch the initial state (mobile has it auto-collapsed, desktop auto-open etc.)
   */
  mounted(): void {
    navigationStore().isSidebarCollapsed = this.isSidebarCollapsed();
  }
}
</script>