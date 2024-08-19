<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.notes.label')">
    <template #icon>
      <fa icon="book"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_NOTES_NEW"
                         :label="$t('navbar.rightSidebar.menu.notes.children.create.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_NOTES_SETTINGS"
                         :label="$t('navbar.rightSidebar.menu.notes.children.settings.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_NOTES_CATEGORY"
                         :label="$t('navbar.rightSidebar.menu.notes.children.categories.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterNotes from "@/router/Modules/VueRouterNotes";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterNotes {
      return VueRouterNotes;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>