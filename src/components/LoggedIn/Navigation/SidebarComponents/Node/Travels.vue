<template>
  <NodeBase :required-right="nodeRight">
    <template #default="props">
      <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.travels.label')"
                                 :is-locked="!props.isRightGranted"
      >
        <template #icon>
          <fa icon="plane"/>
        </template>

        <template #children>
          <SingleMenuElement :route-path="router.ROUTE_PATH_TRAVEL_IDEAS_LIST"
                             :label="$t('navbar.rightSidebar.menu.travels.children.ideas.label')"
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

import VueRouterTravel from "@/router/Modules/VueRouterTravel";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserModuleRights.CAN_ACCESS_TRAVELS_MODULE;
    },
    router(): VueRouterTravel {
      return VueRouterTravel;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>