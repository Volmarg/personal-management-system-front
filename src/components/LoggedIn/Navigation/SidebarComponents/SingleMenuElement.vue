<template>
  <li :class="{
        'l1 single-menu-element': true,
        'long-name-display': showFullLongName
      }"
      ref="textWrapper"
      @mouseover="onTextWrapperMouseOver"
      @mouseleave="onTextWrapperMouseLeave"
  >

    <router-link :to="routePath"
                 :class="{
                    'left-sidebar-item' : true,
                 }"
                 ref="routerWrapper"
                 @click="$emit('click')"
    >
      <p class="overflow-hidden">
        <span class="title"
              ref="title"
              :class="{
                [visitedLinkClasses]: isCurrentlyVisitedPath(routePath),
              }"
        >{{ label }}</span>
      </p>
    </router-link>

  </li>
</template>

<script lang="ts">
import RouteMixin   from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/RouteMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {navigationStore, NavigationStore} from "@/scripts/Vue/Store/NavigationStore";

export default {
  data(): ComponentData {
    return {
      navStore: null as NavigationStore,
      longTextAnimationTime: null,
      longTextAnimationDefaultTime: 1, // seconds
      longTextAnimationMultiplierWidth: 250, // px
      textWrapperHoveredWidth: null,
      textWrapperDefaultHoveredWidth: 0,
      textWrapperHoveredWidthScrollPercent: '75%',
    }
  },
  name: "SidebarSingleMenuElement",
  props: {
    visitedLinkClasses: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type     : String,
      required : true,
    },
    routePath: {
      type     : String,
      required : true,
    },
    showFullLongName: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  mixins: [
    RouteMixin,
  ],
  emits: [
    'click'
  ],
  methods: {
    /**
     * @description stop hover effect once mouse is out
     */
    onTextWrapperMouseLeave(): void {
      this.resetCssVars();
    },
    /**
     * @description show animated full name length
     */
    onTextWrapperMouseOver(): void {
      if (!this.showFullLongName) {
        return;
      }

      if (!this.isTextOverflowing()) {
        return;
      }

      let animationTimeMultiplier = this.$refs.title.scrollWidth / this.longTextAnimationMultiplierWidth;
      if (animationTimeMultiplier < 1) {
        animationTimeMultiplier = 1;
      }

      this.longTextAnimationTime = `${this.longTextAnimationDefaultTime * animationTimeMultiplier}s`;
      this.textWrapperHoveredWidth = `-${this.textWrapperHoveredWidthScrollPercent}`;
    },
    /**
     * @description check if the text in menu element is too long to be displayed
     */
    isTextOverflowing(): boolean {
      if (this.navStore.isSidebarCollapsed) {
        return this.$refs.title.scrollWidth > this.$refs.textWrapper.clientWidth;
      }

      let paddingLeft = Number(getComputedStyle(this.$refs.routerWrapper.$el).paddingLeft.replace("px", ""));

      return this.$refs.title.scrollWidth > this.$refs.routerWrapper.$el.clientWidth - paddingLeft;
    },
    /**
     * @description sets default values of vars used in CSS
     */
    resetCssVars(): void {
      this.longTextAnimationTime = `${this.longTextAnimationDefaultTime}s`;
      this.textWrapperHoveredWidth = `${this.textWrapperDefaultHoveredWidth}%`;
    },
  },
  mounted(): void {
    this.resetCssVars();
    this.navStore = navigationStore();
  }
}
</script>

<style lang="scss" scoped>
.single-menu-element.long-name-display:hover .title {
  transform: translateX(v-bind(textWrapperHoveredWidth));
}

.single-menu-element.long-name-display .title {
  display: inline-block;
  transition: transform (v-bind(longTextAnimationTime)) linear;
}
</style>