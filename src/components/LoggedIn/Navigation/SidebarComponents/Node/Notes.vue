<template>
  <NodeBase :required-right="nodeRight">
    <template #default="props">
      <SingleDropdownMenuElement :label="moduleTranslation.notes"
                                 :is-locked="!props.isRightGranted"
      >
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
  </NodeBase>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";
import NodeBase                  from "@/components/LoggedIn/Navigation/SidebarComponents/Node/NodeBase.vue";
import CategoriesLevel           from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Notes/CategoriesLevel.vue";

import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";
import SidebarMixin        from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

import VueRouterNotes from "@/router/Modules/VueRouterNotes";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {CategoriesState} from "@/scripts/Vue/Store/Module/Notes/CategoriesState";


export default {
  data(): ComponentData {
    return {
      canRefresh: true,
      categoriesStore: [],
      nestedCategories: [],
    }
  },
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement,
    CategoriesLevel,
  },
  computed: {
    nodeRight(): string {
      return UserModuleRights.CAN_ACCESS_NOTES_MODULE;
    },
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
    this.categoriesStore = CategoriesState();
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