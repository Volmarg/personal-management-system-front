<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.goals.label')">
    <template #icon>
      <fa icon="bullseye"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_GOALS_LIST"
                         :label="$t('navbar.rightSidebar.menu.goals.children.list.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_GOALS_PAYMENTS"
                         :label="$t('navbar.rightSidebar.menu.goals.children.payments.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_GOALS_SETTINGS"
                         :label="$t('navbar.rightSidebar.menu.goals.children.settings.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterGoals from "@/router/Modules/VueRouterGoals";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterGoals {
      return VueRouterGoals;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>