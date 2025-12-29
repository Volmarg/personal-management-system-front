<template>
  <NodeBase :required-right="nodeRight">
    <SingleDropdownMenuElement :label="moduleTranslation.images">
      <template #icon>
        <fa :icon="moduleIcon.images"/>
      </template>

      <template #children>
        <SingleMenuElement :route-path="routePath"
                           :label="$t('navbar.rightSidebar.menu.images.children.mainFolder.label')"
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

import SidebarMixin        from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";
import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";

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
      return UserRights.CAN_ACCESS_IMAGES_MODULE;
    },
    routePath(): string {
      return this.buildStorageUrl("/", VueRouterStorage.ROUTE_PATH_STORAGE_IMAGES_FOLDER);
    }
  },
  mixins: [
    SidebarMixin,
    ModuleBaseDataMixin
  ]

}
</script>