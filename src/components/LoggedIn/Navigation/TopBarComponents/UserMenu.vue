<template>
  <div class="relative flex flex-row justify-between user-menu-wrapper">

    <div class="flex relative mr-4"
         v-if="isDeveloper"
    >
      <button class="btn-transparent flex items-center justify-center h-16 w-8"
              @click="showDeveloperSidebar()"
      >
        <icon-svg-wrench/>
      </button>
    </div>

    <!-- User avatar -->
    <div class="flex relative mr-4">
      <button class="h-16 rounded-full mr-2 flex flex-row hover:opacity-70"
              @click="onUserAvatarClick()"
      >
        <img class="h-8 w-8 rounded-full shadow align-self-center" :src="avatarFilePath" alt="avatar">
        <p class="align-self-center ml-2">{{ username }}</p>
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

              <!-- Settings -->
              <single-menu-element :label="$t('views.navbar.topBar.userMenu.settings')"
                                   :to-path="routePaths.userSettings"
              >
                <template #icon>
                  <icon-svg-person/>
                </template>
              </single-menu-element>

              <!-- Logout -->
              <single-menu-element :label="$t('views.navbar.topBar.userMenu.logout')"
                                   :to-path="routePaths.none"
                                   @click="handleLogout()"
              >
                  <template #icon>
                    <icon-svg-logout/>
                  </template>
              </single-menu-element>



            </ul>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import IconSvgPerson     from "@/components/Ui/Icons/Svg/Person.vue";
import IconSvgLogout     from "@/components/Ui/Icons/Svg/Logout.vue";
import IconSvgWrench     from "@/components/Ui/Icons/Svg/Wrench.vue";
import SingleMenuElement from "@/components/LoggedIn/Navigation/TopBarComponents/UserMenuComponents/SingleMenuElement.vue";
import DeveloperSidebar  from "@/components/Development/Sidebar/DeveloperSidebar.vue";

import VueRouter       from "@/router/VueRouter";
import UserController  from "@/scripts/Core/Controller/UserController";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import JwtTokenHandler from "@/scripts/Core/Security/JwtTokenHandler";
import {shallowRef}    from "vue";

import {RightSidebarComponentData} from "@/scripts/Vue/Types/Components/Sidebar";
import EnvReader from "@/scripts/Core/System/EnvReader";
import PublicFolderService from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

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
      loggedInUserData    : null,
      isDeveloper         : false,
      dummyAvatarFilePath : '/image/system/dummy-avatar.png',
      avatarFilePath      : null,
      routePaths: {
        none         : VueRouter.ROUTE_PATH_NONE,
        userSettings : VueRouter.ROUTE_PATH_USER_SETTINGS,
      }
    }
  },
  emits: [
    "toggleRightSidebar",
    "rightSidebarContentChanged",
  ],
  components: {
    "icon-svg-wrench"     : IconSvgWrench,
    "icon-svg-person"     : IconSvgPerson,
    "icon-svg-logout"     : IconSvgLogout,
    "single-menu-element" : SingleMenuElement,
  },
  computed: {
    /**
     * @description return currently logged in username
     */
    username(): string {
      return this.loggedInUserData?.username ?? "";
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
      let user = new UserController().getLoggedInUserData();

      if (null !== user.profilePicturePath) {
        this.avatarFilePath = PublicFolderService.buildPathWithToken(EnvReader.getBackendBaseUrl() + user.profilePicturePath);
        return;
      }

      this.avatarFilePath = PublicFolderService.buildPathWithToken(this.dummyAvatarFilePath);
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
    }
  },
  created(): void {
    this.jwtTokenHandler  = new JwtTokenHandler();
    let userController    = new UserController();
    this.loggedInUserData = userController.getLoggedInUserData();
    this.isDeveloper      = userController.isDeveloper();

    this.loadProfilePicturePath();
  }
}
</script>

<style lang="scss">
.user-menu.opacity-0 {
  cursor: default;
  pointer-events: none;
  touch-action: none;
}
</style>