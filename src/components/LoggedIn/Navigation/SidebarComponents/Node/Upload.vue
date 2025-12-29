<template>
  <NodeBase :required-right="nodeRight">
    <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.storage.label')">
      <template #icon>
        <fa icon="upload"/>
      </template>

      <template #children>
        <SingleMenuElement :route-path="router.ROUTE_PATH_STORAGE_UPLOAD_MANAGE"
                           :label="$t('navbar.rightSidebar.menu.storage.children.manage.label')"
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

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement,
    NodeBase,
  },
  computed: {
    nodeRight(): string {
      return UserRights.CAN_ACCESS_STORAGE_MODULE;
    },
    router(): VueRouterStorage {
      return VueRouterStorage;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>