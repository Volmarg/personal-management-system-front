<template>
  <li class="l1 single-menu-element">

    <router-link :to="routePath"
                 :class="{
                    'left-sidebar-item' : true,
                    'active'            : isCurrentlyVisitedPath,
                 }"
                 @click="$emit('click')"
    >
      <span class="title">{{ label }}</span>
    </router-link>

  </li>
</template>

<script lang="ts">
import VueRouter from "@/router/VueRouter";

export default {
  name: "SidebarSingleMenuElement",
  props: {
    label: {
      type     : String,
      required : true,
    },
    routePath: {
      type     : String,
      required : true,
    }
  },
  emits: [
    'click'
  ],
  computed: {
    /**
     * @description will check if current path opened in browser us equal to that on the menu element
     * @note the slash in front is needed due to usage of {@see VueRouter.ROUTE_PATH_NONE}, else
     *       menu won't work properly with such paths, not that it will be used often but it just has to be working
     */
    isCurrentlyVisitedPath(): boolean {
      let prefix = (VueRouter.ROUTE_PATH_NONE === this.routePath ? "/" : "");
      return this.$route.fullPath.trim() === prefix + this.routePath.trim();
    }
  }
}
</script>