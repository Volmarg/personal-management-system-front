<template>
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
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterPasswords from "@/router/Modules/VueRouterPasswords";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterPasswords {
      return VueRouterPasswords;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>