<template>
  <NodeBase :required-right="nodeRight">
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
  </NodeBase>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";
import NodeBase                  from "@/components/LoggedIn/Navigation/SidebarComponents/Node/NodeBase.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import UserRights from "@/scripts/Core/Security/UserRights";

import VueRouterTodo from "@/router/Modules/VueRouterTodo";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserRights.CAN_ACCESS_TODO_MODULE;
    },
    router(): VueRouterTodo {
      return VueRouterTodo;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>