<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.video.label')">
    <template #icon>
      <fa icon="film"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_STORAGE_VIDEO_SETTINGS"
                         :label="$t('navbar.rightSidebar.menu.images.children.settings.label')"
                         @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_STORAGE_VIDEO_FOLDER"
                         :label="$t('navbar.rightSidebar.menu.images.children.mainFolder.label')"
                         @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterStorage {
      return VueRouterStorage;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>