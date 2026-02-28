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
      <p>
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
import RouteMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/RouteMixin.vue";

export default {
  name: "SidebarSingleMenuElement",
  props: {
    visitedLinkClasses: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: true,
    },
    routePath: {
      type: String,
      required: true,
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
}
</script>

<style lang="scss" scoped>
.long-name-display {
  min-height: 1.25rem;
  a {
    @apply text-left w-full
  }

  p {
    @apply whitespace-normal
  }
}
</style>