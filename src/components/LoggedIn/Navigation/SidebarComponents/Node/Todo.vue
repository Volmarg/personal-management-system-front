<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.todo.label')">
    <template #icon>
      <fa icon="tasks"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_TODO_LIST"
                         :label="$t('navbar.rightSidebar.menu.todo.children.list.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";
import VueRouterTodo from "@/router/Modules/VueRouterTodo";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterTodo {
      return VueRouterTodo;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>