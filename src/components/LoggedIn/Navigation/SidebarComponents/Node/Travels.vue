<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.travels.label')">
    <template #icon>
      <fa icon="plane"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="'#'"
                         :label="$t('navbar.rightSidebar.menu.travels.children.ideas.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  mixins: [
    SidebarMixin
  ]

}
</script>