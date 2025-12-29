<template>
  <NodeBase :required-right="nodeRight">
    <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.passwords.label')">
      <template #icon>
        <fa icon="key"/>
      </template>

      <template #children>
        <SingleMenuElement :route-path="router.ROUTE_PATH_PASSWORDS_LIST"
                           :label="$t('navbar.rightSidebar.menu.passwords.children.list.label')"
                            @click="onMenuElementClick"
        />
        <SingleMenuElement :route-path="router.ROUTE_PATH_PASSWORDS_SETTINGS"
                           :label="$t('navbar.rightSidebar.menu.passwords.children.settings.label')"
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

import VueRouterPasswords from "@/router/Modules/VueRouterPasswords";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserRights.CAN_ACCESS_PASSWORDS_MODULE;
    },
    router(): VueRouterPasswords {
      return VueRouterPasswords;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>