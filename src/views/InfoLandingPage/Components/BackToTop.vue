<template>
  <div id="back-to-top"
       :class="{
          'hidden' : !isGoBackVisible,
       }"
  >
    <a id="top"
       @click.prevent="scrollToTop"
       class="top">
      <fa :icon="['fa', 'chevron-up']" />
    </a></div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import WindowService from "@/scripts/Core/Services/WindowService";
import Fa from "@/components/Libs/Fontawesome.vue";

export default {
  components: {Fa},
  data(): ComponentData {
    return {
     isGoBackVisible: false,
    }
  },
  methods: {
    /**
     * @description check if goToTopIsVisible
     */
    isVisible(): void {
      this.isGoBackVisible = WindowService.isScrolledBehindPx(300);
    },
    /**
     * @description scrolls to the top of window
     */
    scrollToTop(): void {
      WindowService.scrollToTop();
    },
    /**
     * @description attaches the window scroll event
     *             - keeps checking if the "go to top" should be visible or not
     */
    attachScrollHandler(): void {
      window.addEventListener("scroll", this.isVisible);
    }
  },
  mounted(): void {
    this.attachScrollHandler();
  }
}
</script>

<style lang="scss">
#top {
  &:hover {
    @apply opacity-70
  }

  & svg {
    margin-right: 0 !important;
  }
  background-color: rgb(55, 125, 255) !important;

  @apply  border-gray-50 border border-solid

}
</style>