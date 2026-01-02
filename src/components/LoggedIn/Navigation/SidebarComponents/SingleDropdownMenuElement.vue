<template>
  <component :is="elementType" class="sidebar-single-dropdown-menu-element relative">
      <NavButton v-if="buttonIsLink"
                 :label="label"
                 :is-visible="isVisible"
                 :title-classes="isCurrentlyVisitedPath(linkPath) ? visitedLinkClasses : ''"
                 @click.stop="navElementClick"
                 @arrow-click.stop="navElementClick"
      >
        <template #icon>
          <slot name="icon"></slot>
        </template>
      </NavButton>

    <NavButton v-else
               :label="label"
               :is-visible="isVisible"
               @click.stop="navElementClick"
    >
      <template #icon>
        <slot name="icon"></slot>
        <MenuElementLockState :is-locked="isLocked"/>
      </template>
    </NavButton>

    <ul>
      <slot name="children"></slot>
    </ul>

  </component>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import BaseError       from "@/scripts/Core/Error/BaseError";
import RouteMixin      from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/RouteMixin.vue";

import MenuElementLockState from "@/components/LoggedIn/Navigation/SidebarComponents/MenuElementLockState.vue";
import NavButton            from "@/components/LoggedIn/Navigation/SidebarComponents/DropdownMenu/Button.vue";

export default {
  name: "SidebarSingleDropdownMenuElement",
  data(): ComponentData {
    return {
      isVisible : false,
    }
  },
  props: {
    isLocked: {
      type: Boolean,
      required: false,
      default: false
    },
    linkPath: {
      type: [String, null],
      required: false,
      default: null
    },
    buttonIsLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    visitedLinkClasses: {
      type: String,
      required: false,
      default: ''
    },
    onlyArrowOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    elementType: {
      type: String,
      required: false,
      default: 'div'
    },
    label: {
      type     : String,
      required : true,
    }
  },
  mixins: [
    RouteMixin
  ],
  components: {
    NavButton,
    MenuElementLockState
  },
  methods: {
    /**
     * @description will toggle the menu open / closed
     */
    navElementClick(event: PointerEvent): void {
      let target = event.target as HTMLElement;
      let arrowOnlyTagNames = ["SVG", 'POLYLINE'];

      if (this.onlyArrowOpen) {
        if (arrowOnlyTagNames.includes(target.tagName.toUpperCase())) {
          this.isVisible = !this.isVisible;
        } else if (this.linkPath) {
          this.$router.push(this.linkPath)
        }

        return;
      }

      if (this.buttonIsLink) {
        throw new BaseError("If label is a link then You must set arrow as only way to open the dropdown!");
      }

      if (this.linkPath) {
        this.$router.push(this.linkPath)
      }

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