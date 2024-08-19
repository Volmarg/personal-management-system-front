<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.job.label')">
    <template #icon>
      <fa icon="suitcase"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_JOB_AFTERHOURS"
                         :label="$t('navbar.rightSidebar.menu.job.children.afterhours.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_JOB_HOLIDAYS"
                         :label="$t('navbar.rightSidebar.menu.job.children.holidays.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_JOB_SETTINGS"
                         :label="$t('navbar.rightSidebar.menu.job.children.settings.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterJob from "@/router/Modules/VueRouterJob";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterJob {
      return VueRouterJob;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>