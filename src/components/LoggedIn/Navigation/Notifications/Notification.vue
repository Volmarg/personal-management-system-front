<template>
    <!-- bell -->
    <div v-tippy="$t('navbar.topBar.notification.message')"
         class="mr-3 relative cursor-pointer hover:opacity-50"
         @click="onBellClick()"
    >
      <fa :icon="['far', 'bell']"
          class="text-3xl badge"
          :data-count="count"
      />

    </div>

    <!-- menu -->
    <div class="shadow-xl absolute top-0 right-0 mt-16 transition transition-all duration-300 ease-in-out open scale notification-menu"
         v-click-away="hideMenu"
         :class="{
              'opacity-100 dropdown' : isMenuVisible,
              'opacity-0' : !isMenuVisible,
           }"
    >
      <div class="dropdown-content bottom-end">
        <div class="flex flex-col w-full">
          <ul class="list-none">

            <SingleNotification v-for="notification in notifications"
                                :key="JSON.stringify(notification)"
                                :notification="notification"
            />

          </ul>
        </div>
      </div>
    </div>

</template>

<script lang="ts">
import {ComponentData}     from "@/scripts/Vue/Types/Components/types";
import SymfonySystemRoutes from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";

import SingleNotification from "@/components/LoggedIn/Navigation/Notifications/components/SingleNotification.vue";

export default {
  data(): ComponentData {
    return {
      /**
       * @description this is a special flag to prevent case when menu is instantly being hidden when opened
       *              with this when menu gets open and the `hide` logic will be called, it will be blocked for first
       *              call (that's the case when menu would normally be instantly closed)
       */
      isAllowedToHideMenu : false,
      isMenuVisible: false,
      notifications: [],
    }
  },
  computed: {
    /**
     * @description count of notifications
     */
    count(): number {
      return this.notifications.length;
    }
  },
  components: {
    SingleNotification,
  },
  methods: {
    /**
     * @description gets notifications from backend
     */
    async fetchAll(): Promise<void> {
      this.notifications = await this.$moduleCall.getAll(SymfonySystemRoutes.NOTIFICATION_BASE);
    },
    /**
     * @description handle clicking on bell
     */
    onBellClick(): void {
      this.showMenu();
    },
    /**
     * @description will show menu
     */
    showMenu(): void {
      if(this.isMenuVisible){
        this.hideMenu();
        return;
      }
      this.isMenuVisible = true;
    },
    /**
     * @description will hide menu
     */
    hideMenu(): void {
      if (this.isMenuVisible) { // must be checked else prevent from even opening the menu

        if (this.isAllowedToHideMenu) {
          this.isMenuVisible = false;
          this.isAllowedToHideMenu = false; // reset
          return;
        }

        this.isAllowedToHideMenu = true;
      }
    },
  },
  created() {
    this.fetchAll();
  },
}
</script>

<style lang="scss" scoped>
$menuHeight: 400px;
$menuWidth: 350px;

.notification-menu {
  max-height: $menuHeight;
  min-width: $menuWidth;

  .dropdown-content {
    max-height: $menuHeight;
    min-width: $menuWidth;
    @apply w-full
  }

  @apply mx-4 overflow-y-scroll
}


.badge:after{
  content: attr(data-count);
  position: absolute;
  height:1.3rem;
  top:-0.25rem;
  right:-0.25rem;
  width:1.25rem;
  text-align: center;
  line-height: 1.25rem;
  font-size: 0.6rem;
  border-radius: 50%;
  color:white;

  @apply bg-blue-500 border border-blue-500
}
</style>
