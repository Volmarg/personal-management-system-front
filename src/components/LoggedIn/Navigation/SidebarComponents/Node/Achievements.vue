<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.achievements.label')">
    <template #icon>
      <fa icon="trophy" />
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_ACHIEVEMENTS_LIST"
                         :label="$t('navbar.rightSidebar.menu.achievements.children.list.label')"
                         @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterAchievements from "@/router/Modules/VueRouterAchievements";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterAchievements {
      return VueRouterAchievements;
    }
  },
  mixins: [
    SidebarMixin
  ]
}
</script>