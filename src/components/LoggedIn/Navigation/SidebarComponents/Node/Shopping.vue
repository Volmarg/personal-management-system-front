<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.shopping.label')">
    <template #icon>
      <fa icon="shopping-basket"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_SHOPPING_LIST"
                         :label="$t('navbar.rightSidebar.menu.shopping.children.plans.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterShopping from "@/router/Modules/VueRouterShopping";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterShopping {
      return VueRouterShopping;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>