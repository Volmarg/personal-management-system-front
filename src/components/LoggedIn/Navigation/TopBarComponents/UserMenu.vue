<template>
  <div class="relative flex flex-row justify-between user-menu-wrapper">

    <div class="flex relative mr-4"
         v-if="isDeveloper"
    >
      <button class="btn-transparent flex items-center justify-center h-16 w-8"
              @click="showDeveloperSidebar()"
      >
        <la svg-icon-name="tools-solid"
            font-size="40"
            class="mt-6 hover:opacity-60"
        />
      </button>
    </div>

    <!-- User avatar -->
    <div class="flex relative mr-4">
      <button class="h-16 rounded-full mr-2 flex flex-row hover:opacity-70"
              @click="onUserAvatarClick()"
      >
        <img class="avatar" :src="avatarFilePath" alt="avatar">
        <p class="align-self-center ml-2"
           v-if="!isPhoneBreakingPoint"
        >{{ username }}</p>
        <fa
            :icon="userMenuArrowAwesomeIconName"
            class="align-self-center ml-1 font-weight-bold"
        />
      </button>

      <!-- Menu -->
      <div class="dropdown absolute top-0 right-0 mt-16 transition transition-all duration-300 ease-in-out open scale user-menu"
           v-click-away="hideUserMenu"
           :class="{
              'opacity-100' : isUserMenuVisible,
              'opacity-0'   : !isUserMenuVisible,
           }"
      >
        <div class="dropdown-content w-48 bottom-end">
          <div class="flex flex-col w-full">
            <ul class="list-none">

              <!-- Profile -->
              <single-menu-element :label="$t('navbar.topBar.userMenu.profile.label')"
                                   :to-path="routePaths.userSettings"
                                   @click="hideUserMenu"
                                   v-tippy="$t('navbar.topBar.userMenu.profile.description')"
              >
                <template #icon>
                  <la svg-icon-name="user-solid"
                      font-size="24"
                      class="mt-3"
                  />
                </template>
              </single-menu-element>

              <!-- Lock -->
              <single-menu-element :label="$t(`navbar.topBar.userMenu.lock.state.${isSystemLocked ? 'locked' : 'unlocked'}.label`)"
                                   :is-link-based="false"
                                   v-tippy="$t('navbar.topBar.userMenu.lock.description')"
                                   @click="handleSystemLock"
                                   :label-classes="{
                                     [isSystemLocked ? 'text-red-500' : 'text-green-500'] : true
                                   }"
              >
                <template #icon>
                  <la :svg-icon-name="isSystemLocked ? 'lock-solid' : 'unlock-solid'"
                      font-size="24"
                      class="mt-3"
                      :color="isSystemLocked ? color.red : color.green"
                  />
                </template>
              </single-menu-element>

              <!-- Settings -->
              <single-menu-element :label="$t('navbar.topBar.userMenu.settings.label')"
                                   :to-path="routePaths.systemSettings"
                                   v-tippy="$t('navbar.topBar.userMenu.settings.description')"
                                   @click="hideUserMenu"
              >
                <template #icon>
                  <la svg-icon-name="cog-solid"
                      font-size="24"
                      class="mt-3"
                  />
                </template>
              </single-menu-element>

              <!-- Logout -->
              <single-menu-element :label="$t('navbar.topBar.userMenu.logout.label')"
                                   :to-path="routePaths.none"
                                   v-tippy="$t('navbar.topBar.userMenu.logout.description')"
                                   @click="handleLogout();hideUserMenu"
                                   class="logout"
              >
                  <template #icon>
                    <la svg-icon-name="sign-out-alt-solid"
                        font-size="24"
                        class="mt-3"
                    />
                  </template>
              </single-menu-element>

            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
  <LockModal :is-modal-visible="isLockModalVisible"
             @modal-closed="isLockModalVisible=false"
  />
</template>

<script lang="ts">
import LockModal         from "@/components/LoggedIn/Navigation/TopBarComponents/UserMenuComponents/LockModal.vue";
import SingleMenuElement from "@/components/LoggedIn/Navigation/TopBarComponents/UserMenuComponents/SingleMenuElement.vue";
import DeveloperSidebar  from "@/components/Development/Sidebar/DeveloperSidebar.vue";

import Colors from "@/scripts/Vue/Mixins/Colors.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import VueRouter       from "@/router/VueRouter";
import UserController  from "@/scripts/Core/Controller/UserController";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import JwtTokenHandler from "@/scripts/Core/Security/JwtTokenHandler";
import {shallowRef}    from "vue";

import {RightSidebarComponentData} from "@/scripts/Vue/Types/Components/Sidebar";
import PublicFolderService         from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

import {userStateStore, UserStateStore} from "@/scripts/Vue/Store/UserState";

export default {
  name: "UserMenu",
  data(): ComponentData {
    return {
      /**
       * @description this is a special flag to prevent case when menu is instantly being hidden when opened
       *              with this when menu gets open and the `hide` logic will be called, it will be blocked for first
       *              call (that's the case when menu would normally be instantly closed)
       */
      isAllowedToHideMenu : false,
      isUserMenuVisible   : false,
      jwtTokenHandler     : null,
      userDataStore       : null as UserStateStore | null,
      isDeveloper         : false,
      avatarFilePath      : null,
      docsUrl             : 'https://volmarg.github.io/',
      isLockModalVisible  : false,
      isSystemLocked      : userStateStore().user?.isSystemLocked ?? true,
      routePaths: {
        none           : VueRouter.ROUTE_PATH_NONE,
        userSettings   : VueRouter.ROUTE_PATH_USER_SETTINGS,
        systemSettings : VueRouter.ROUTE_PATH_SYSTEM_SETTINGS,
      }
    }
  },
  emits: [
    "toggleRightSidebar",
    "rightSidebarContentChanged",
  ],
  components: {
    "single-menu-element" : SingleMenuElement,
    LockModal,
  },
  mixins: [
    Colors,
    ResponsiveVarsMixin
  ],
  computed: {
    /**
     * @description return currently logged in username
     */
    username(): string {
      return this.userDataStore.user?.username ?? "";
    },
    /**
     * @description decide which arrow icon to show next to user menu
     */
    userMenuArrowAwesomeIconName(): string {
      return (this.isUserMenuVisible ? 'chevron-up': 'chevron-down');
    }
  },
  methods: {
    /**
     * @description sets the user profile image path
     *              this must be a method, because profile image is being loaded from token,
     *              so this function gets called on profile image change, vue
     *              cannot trigger it automatically
     */
    loadProfilePicturePath(): void {
      let user = this.userDataStore.user;
      this.avatarFilePath = PublicFolderService.buildUrl(user.profilePicturePath);
    },
    /**
     * @description will handle the user logout action
     */
    handleLogout(): void {
      this.jwtTokenHandler.invalidateTokenAndRedirectUser();
    },
    /**
     * @description handle clicking on user avatar
     */
    onUserAvatarClick(): void {
      this.showUserMenu();
    },
    /**
     * @description will show user menu
     */
    showUserMenu(): void {
      if(this.isUserMenuVisible){
        this.hideUserMenu();
        return;
      }
      this.isUserMenuVisible = true;
    },
    /**
     * @description will hide user menu
     */
    hideUserMenu(): void {
      if(this.isUserMenuVisible){ // must be checked else prevent from even opening the menu

        if(this.isAllowedToHideMenu){
          this.isUserMenuVisible   = false;
          this.isAllowedToHideMenu = false; // reset
          return;
        }

        this.isAllowedToHideMenu = true;
      }
    },
    /**
     * @description will show right sidebar (the hack with next tick is a must to make sidebar work properly)
     */
    showDeveloperSidebar(): void {
      let sidebarWidthPercentage = "30%";
      let sidebarData: RightSidebarComponentData = {
        componentInstance : shallowRef(DeveloperSidebar),
      };

      this.$emit("toggleRightSidebar", {isSidebarVisible: false});
      this.$emit("rightSidebarContentChanged", sidebarData, sidebarWidthPercentage);

      this.$nextTick(() => {
        this.$emit("toggleRightSidebar", {isSidebarVisible: true});
      })
    },
    /**
     * @description if system is locked then shows unlock dialog, else locks system back
     */
    handleSystemLock(): void {
      this.hideUserMenu();
      this.isLockModalVisible = true;
    },
    /**
     * @description open docs page in new tab
     */
    goToDocs(): void {
      window.open(this.docsUrl, '_blank').focus();
    }
  },
  created(): void {
    this.jwtTokenHandler  = new JwtTokenHandler();
    let userController    = new UserController();

    this.userDataStore = userStateStore();
    this.userDataStore.loadUserData();

    this.isDeveloper = userController.isDeveloper();
    this.loadProfilePicturePath();
  },
  watch: {
    'userDataStore.user.profilePicturePath'(): void {
      this.loadProfilePicturePath();
    }
  }
}
</script>

<style lang="scss">
.user-menu.opacity-0 {
  cursor: default;
  pointer-events: none;
  touch-action: none;
}

.logout * {
  $logoutColor: rgb(17, 24, 39);
  color: $logoutColor !important;
  fill: $logoutColor !important;
  font-weight: 600;
}
.avatar {
  min-width: 30px !important; // because mobile view squashes the avatar
  align-self: center;
  @apply h-8 w-8 rounded-full shadow
}
</style>