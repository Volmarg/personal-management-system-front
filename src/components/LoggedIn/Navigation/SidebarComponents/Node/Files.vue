<template>
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
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";
import SidebarMixin        from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
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