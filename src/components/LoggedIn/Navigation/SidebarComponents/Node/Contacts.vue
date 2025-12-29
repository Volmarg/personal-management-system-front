<template>
  <NodeBase :required-right="nodeRight">
    <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.contacts.label')">
      <template #icon>
        <fa icon="user-friends"/>
      </template>

      <template #children>
        <SingleMenuElement :route-path="router.ROUTE_PATH_CONTACTS_LIST"
                           :label="$t('navbar.rightSidebar.menu.contacts.children.contacts.label')"
                            @click="onMenuElementClick"
        />
        <SingleMenuElement :route-path="router.ROUTE_PATH_CONTACTS_SETTINGS"
                           :label="$t('navbar.rightSidebar.menu.contacts.children.settings.label')"
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

import VueRouterContacts from "@/router/Modules/VueRouterContacts";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserRights.CAN_ACCESS_CONTACTS_MODULE;
    },
    router(): VueRouterContacts {
      return VueRouterContacts;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>