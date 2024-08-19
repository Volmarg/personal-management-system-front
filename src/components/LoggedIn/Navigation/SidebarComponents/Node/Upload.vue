<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.upload.label')">
    <template #icon>
      <fa icon="upload"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_STORAGE_UPLOAD_ADD"
                         :label="$t('navbar.rightSidebar.menu.upload.children.add.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_STORAGE_UPLOAD_MANAGE"
                         :label="$t('navbar.rightSidebar.menu.upload.children.manage.label')"
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