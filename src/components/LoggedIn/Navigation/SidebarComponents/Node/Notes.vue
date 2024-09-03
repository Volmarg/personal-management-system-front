<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.notes.label')">
    <template #icon>
      <fa icon="book"/>
    </template>

    <template #children>
      <CategoriesLevel :categories="nestedCategories"/>

      <SingleMenuElement :route-path="router.ROUTE_PATH_NOTES_NEW"
                         :label="$t('navbar.rightSidebar.menu.notes.children.create.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_NOTES_SETTINGS"
                         :label="$t('navbar.rightSidebar.menu.notes.children.settings.label')"
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

import {ComponentData}         from "@/scripts/Vue/Types/Components/types";
import {notesModuleStateStore} from "@/scripts/Vue/Store/NotesModuleState";

import CategoriesLevel from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Notes/CategoriesLevel.vue";

export default {
  data(): ComponentData {
    return {
      nestedCategories: [],
    }
  },
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement,
    CategoriesLevel,
  },
  computed: {
    router(): VueRouterNotes {
      return VueRouterNotes;
    },
  },
  mixins: [
    SidebarMixin
  ],
  created(): void {
    this.nestedCategories = notesModuleStateStore().getNestedCategories()
  },

}
</script>