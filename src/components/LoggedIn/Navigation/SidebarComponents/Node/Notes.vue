<template>
  <SingleDropdownMenuElement :label="moduleTranslation.notes">
    <template #icon>
      <fa :icon="moduleIcon.notes"/>
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

import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";
import SidebarMixin        from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterNotes from "@/router/Modules/VueRouterNotes";

import {ComponentData}         from "@/scripts/Vue/Types/Components/types";
import {notesCategoriesModuleStateStore} from "@/scripts/Vue/Store/NotesCategoriesModuleState";

import CategoriesLevel from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Notes/CategoriesLevel.vue";

export default {
  data(): ComponentData {
    return {
      canRefresh: true,
      categoriesStore: [],
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
    SidebarMixin,
    ModuleBaseDataMixin
  ],
  methods: {
    /**
     * @description will build the categories tree. Refresh check is necessary, else watcher ends up in endless loop
     */
    async buildCategories(): Promise<void> {
      if (!this.canRefresh) {
        return;
      }

      this.canRefresh = false;
      this.nestedCategories = [];
      await this.categoriesStore.getAll();
      this.nestedCategories = this.categoriesStore.getNestedCategories()
      this.$nextTick(() => {
        this.canRefresh = true;
      })
    },
  },
  async beforeMount(): Promise<void> {
    this.categoriesStore = notesCategoriesModuleStateStore();
    this.buildCategories();
  },
  watch: {
    'categoriesStore.allEntries': {
      deep: true,
      handler: function() {
        this.buildCategories();
      }
    }
  }

}
</script>