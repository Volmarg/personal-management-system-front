<template>
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
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin        from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";
import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
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