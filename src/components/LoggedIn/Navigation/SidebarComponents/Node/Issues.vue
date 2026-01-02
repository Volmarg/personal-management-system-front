<template>
  <NodeBase :required-right="nodeRight">
    <template #default="props">
      <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.issues.label')"
                                 :is-locked="!props.isRightGranted"
      >
        <template #icon>
          <fa icon="history"/>
        </template>

        <template #children>
          <SingleMenuElement :route-path="router.ROUTE_PATH_ISSUES_PENDING_LIST"
                             :label="$t('navbar.rightSidebar.menu.issues.children.pending.label')"
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
import NodeBase                  from "@/components/LoggedIn/Navigation/SidebarComponents/Node/NodeBase.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

import VueRouterIssues from "@/router/Modules/VueRouterIssues";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserModuleRights.CAN_ACCESS_ISSUES_MODULE;
    },
    router(): VueRouterIssues {
      return VueRouterIssues;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>