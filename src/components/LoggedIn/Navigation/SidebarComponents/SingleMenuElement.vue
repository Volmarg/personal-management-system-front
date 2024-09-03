<template>
  <li class="l1 single-menu-element">

    <router-link :to="routePath"
                 :class="{
                    'left-sidebar-item' : true,
                 }"
                 @click="$emit('click')"
    >
      <span class="title"
            :class="{
              [visitedLinkClasses]: isCurrentlyVisitedPath(routePath),
            }"
      >{{ label }}</span>
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
      type     : String,
      required : true,
    },
    routePath: {
      type     : String,
      required : true,
    }
  },
  mixins: [
    RouteMixin
  ],
  emits: [
    'click'
  ],
}
</script>