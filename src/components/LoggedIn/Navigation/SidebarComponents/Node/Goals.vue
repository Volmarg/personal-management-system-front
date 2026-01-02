<template>
  <NodeBase :required-right="nodeRight">
    <template #default="props">
      <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.goals.label')"
                                 :is-locked="!props.isRightGranted"
      >
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
        </template>
      </SingleDropdownMenuElement>
    </template>
  </NodeBase>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";
import NodeBase                  from './NodeBase.vue';

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

import VueRouterGoals from "@/router/Modules/VueRouterGoals";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement,
    NodeBase
  },
  computed: {
    nodeRight(): string {
      return UserModuleRights.CAN_ACCESS_GOALS_MODULE;
    },
    router(): VueRouterGoals {
      return VueRouterGoals;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>