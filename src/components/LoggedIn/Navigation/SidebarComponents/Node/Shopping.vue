<template>
  <NodeBase :required-right="nodeRight">
    <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.shopping.label')">
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
  </NodeBase>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";
import NodeBase                  from "@/components/LoggedIn/Navigation/SidebarComponents/Node/NodeBase.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import UserRights from "@/scripts/Core/Security/UserRights";

import VueRouterShopping from "@/router/Modules/VueRouterShopping";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserRights.CAN_ACCESS_SHOPPING_MODULE;
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