<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.calendar.label')">
    <template #icon>
      <fa icon="calendar"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_CALENDAR_VIEW"
                         :label="$t('navbar.rightSidebar.menu.calendar.children.view.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterCalendar from "@/router/Modules/VueRouterCalendar";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterCalendar {
      return VueRouterCalendar;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>