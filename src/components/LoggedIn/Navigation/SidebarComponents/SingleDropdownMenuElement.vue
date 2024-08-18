<template>
  <div class="sidebar-single-dropdown-menu-element">

    <button class="left-sidebar-item"
            :class="{
            'hidden-sibling' : !isVisible,
            'open-sibling'   : isVisible
          }"
            @click="toggleOpen()"
    >
      <div class="icon-wrapper">
        <slot name="icon"></slot>
      </div>
      <span class="title">{{ label }}</span>
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="ml-auto arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <ul>
      <slot name="children"></slot>
    </ul>

  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  name: "SidebarSingleDropdownMenuElement",
  data(): ComponentData {
    return {
      isVisible : false,
    }
  },
  props: {
    label: {
      type     : String,
      required : true,
    }
  },
  methods: {
    /**
     * @description will toggle the menu open / closed
     */
    toggleOpen(): void {
      this.isVisible = !this.isVisible;
    }
  }
}
</script>

<style lang="scss">
$heightTransitionDuration  : 300ms;

/**
  Required to keep the slide smooth with opacity - makes nice, steady animation
 */
$multiplierDuration        : 2;
$opacityTransitionDuration : $heightTransitionDuration * $multiplierDuration;
/**
  This value will never be reached but is needed to handle the smooth transition and to allow to `animate` slide at all
  It doesnt do anything else, its just there to allow animating slide
 */
$maxMenuHeight: 99999px;

// overwrite the normal behaviour of hidden
[data-collapsed=false] .hidden-sibling + ul {
  transition: max-height cubic-bezier(0, 1, 0, 1) $heightTransitionDuration, opacity cubic-bezier(0, 1, 0, 1) $opacityTransitionDuration;;
  max-height: 0;
  opacity: 0;
  display: block !important;
  transform-origin: top;
}

// overwrite the normal behaviour of open
[data-collapsed=false] .open-sibling + ul {
  transition: max-height ease-in-out $heightTransitionDuration, opacity ease-in-out $opacityTransitionDuration;
  max-height: $maxMenuHeight;
  opacity: 1;
  transform-origin: bottom;
}
</style>

<style lang="scss">
// this is needed due to fontawesome being globally loaded
.sidebar-single-dropdown-menu-element {
  .icon-wrapper {
    svg {
      height: 20px;
      width: 64px;
    }
  }
}
</style>