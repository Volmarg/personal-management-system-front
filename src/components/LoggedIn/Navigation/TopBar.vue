<template>
  <div>

    <div class="navbar navbar-1 border-b">
      <div class="navbar-inner w-full flex items-center justify-start">
        <hamburger @click="$emit('toggleSidebarSize')"/>
        <Search/>

        <!-- This span moves all elements after it `to right side` -->
        <span class="ml-auto"></span>

        <Notification />
        <Timer />

        <user-menu @toggle-right-sidebar="$emit('toggleRightSidebar', $event)"
                   @right-sidebar-content-changed="onRightSidebarContentChanged"
                   ref="userMenuComponent"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Search           from "@/components/Modules/Search/Search.vue";
import Hamburger        from "@/components/Navigation/Hamburger.vue";
import UserMenu         from "@/components/LoggedIn/Navigation/TopBarComponents/UserMenu.vue";
import Timer            from "@/components/LoggedIn/Navigation/Timer/Timer.vue";
import Notification     from "@/components/LoggedIn/Navigation/Notifications/Notification.vue";

import {RightSidebarComponentData} from "@/scripts/Vue/Types/Components/Sidebar";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  name: "NavigationTopBar",
  data(): ComponentData {
    return {
      isFoundsModalVisible: false,
    }
  },
  emits: [
      'toggleSidebarSize',
      'rightSidebarContentChanged',
  ],
  components: {
    "hamburger"    : Hamburger,
    "user-menu"    : UserMenu,
    Timer,
    Search,
    Notification
  },
  methods: {
    /**
     * @description passing forward the sidebar component data as Vue3 does not support passing forward
     *              multiple data via $event (only the first one gets forwarded),
     */
    onRightSidebarContentChanged(sidebarData: RightSidebarComponentData, widthPercent: string): void {
      this.$emit("rightSidebarContentChanged", sidebarData, widthPercent);
    }
  }
}
</script>