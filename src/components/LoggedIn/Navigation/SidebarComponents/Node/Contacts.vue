<template>
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
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterContacts from "@/router/Modules/VueRouterContacts";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterContacts {
      return VueRouterContacts;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>