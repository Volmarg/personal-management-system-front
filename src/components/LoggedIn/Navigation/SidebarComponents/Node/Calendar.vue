<template>
  <NodeBase :required-right="nodeRight">
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
  </NodeBase>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";
import NodeBase                  from "@/components/LoggedIn/Navigation/SidebarComponents/Node/NodeBase.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import UserRights from "@/scripts/Core/Security/UserRights";

import VueRouterCalendar from "@/router/Modules/VueRouterCalendar";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserRights.CAN_ACCESS_CALENDAR_MODULE;
    },
    router(): VueRouterCalendar {
      return VueRouterCalendar;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>