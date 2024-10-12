<template>
  <SingleDropdownMenuElement :label="parentName"
                             element-type="li"
                             :only-arrow-open="!isRootLink"
                             :button-is-link="!isRootLink"
                             :link-path="!isRootLink ? buildNotesCategoryUrl(parent.id) : null"
                             visited-link-classes="category-active"
  >
    <template #children>

      <SingleMenuElement :route-path="buildNotesCategoryUrl(category.id)"
                         v-for="category in childless"
                         :label="category.name"
                         visited-link-classes="relative category-active"
                         :key="JSON.stringify(category)"
      />

      <!-- there are children, so adding dropdown -->
      <CategoriesLevel v-for="category in withChildren"
                       :key="JSON.stringify(category)"
                       :categories="category.children"
                       :parent="category"
      />

    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";
import SidebarMixin        from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterNotes  from "@/router/Modules/VueRouterNotes";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      rootLinkLabel: this.$t('navbar.rightSidebar.menu.notes.children.categories.label'),
    }
  },
  props: {
    parent: {
      type: Object,
      required: false,
      default: null,
    },
    categories: {
      type: Array,
      required: true,
    }
  },
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement,
  },
  mixins: [
    SidebarMixin,
    ModuleBaseDataMixin
  ],
  computed: {
    /**
     * @description check if current link is a root link or is it really a category link
     *              Root link means the menu element that shows note categories, but the link
     *              itself is not a page, just a menu element
     */
    isRootLink(): boolean {
      return this.parentName === this.rootLinkLabel;
    },
    /**
     * @description returns the used parent name
     */
    parentName(): string {
      return !this.parent ? this.rootLinkLabel : this.parent.name;
    },
    /**
     * @description returns the categories WITHOUT nested children
     */
    childless(): Array {
      let filtered = [];
      for (let category of this.categories) {
        if (!category.children || (category.children && category.children.length === 0)) {
          filtered.push(category)
        }
      }

      return filtered;
    },
    /**
     * @description returns the categories that have nested children
     */
    withChildren(): Array {
      let filtered = [];
      for (let category of this.categories) {
        if (category.children && category.children.length > 0) {
          filtered.push(category)
        }
      }

      return filtered;
    },
    router(): VueRouterNotes {
      return VueRouterNotes;
    }
  },
}
</script>