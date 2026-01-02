<template>
  <NodeBase :required-right="nodeRight">
    <template #default="props">
      <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.shopping.label')"
                                 :is-locked="!props.isRightGranted"
      >
        <template #icon>
          <fa icon="shopping-basket"/>
        </template>

        <template #children>
          <SingleMenuElement :route-path="router.ROUTE_PATH_SHOPPING_LIST"
                             :label="$t('navbar.rightSidebar.menu.shopping.children.plans.label')"
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

import VueRouterShopping from "@/router/Modules/VueRouterShopping";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserModuleRights.CAN_ACCESS_SHOPPING_MODULE;
    },
    router(): VueRouterShopping {
      return VueRouterShopping;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>