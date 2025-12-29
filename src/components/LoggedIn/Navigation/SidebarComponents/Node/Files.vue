<template>
  <NodeBase :required-right="nodeRight">
    <SingleDropdownMenuElement :label="moduleTranslation.files">
      <template #icon>
        <fa :icon="moduleIcon.files"/>
      </template>

      <template #children>
        <SingleMenuElement :route-path="routePath"
                           :label="$t('navbar.rightSidebar.menu.files.children.mainFolder.label')"
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

import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";
import SidebarMixin        from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import UserRights from "@/scripts/Core/Security/UserRights";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserRights.CAN_ACCESS_FILES_MODULE;
    },
    routePath(): string {
      return this.buildStorageUrl("/", VueRouterStorage.ROUTE_PATH_STORAGE_FILES_FOLDER);
    },
  },
  mixins: [
    SidebarMixin,
    ModuleBaseDataMixin
  ]

}
</script>