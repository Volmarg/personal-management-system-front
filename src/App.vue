<template>
  <section class="main-page-wrapper">
    <MessageBar/>
    <SystemDisabledBar/>

    <div id="nav"
         ref="nav"
         v-show="false"
    >
      <router-link :to="routerPaths.login"
                   v-show="!isUserLoggedIn"
      >{{ $t('views.navbar.main.login') }}
      </router-link> |

      <router-link :to="routerPaths.register"
                   v-show="!isUserLoggedIn"
      >{{ $t('views.navbar.main.register') }}
      </router-link>
    </div>

    <!-- Events on this elements are the one emitted from the "views" (pages) -->
      <router-view
          @login-success="handleLoginSuccess()"
          @show-notification="handleShowingAlert"
          v-slot="{ Component }"
      >
        <transition name="router-view">
          <component :is="Component"
                     ref="appRouterView"
          ></component>
        </transition>
      </router-view>

    <dispatcher-listener
        @user-invalidated="handleUserInvalidated()"
        @refresh-user-store="handleUserStoreRefresh"
        @show-full-page-loader="handleShowFullPageLoader()"
        @hide-full-page-loader="handleHideFullPageLoader()"
        @show-bar-loader="showBarLoader()"
        @hide-bar-loader="hideBarLoader()"
        @show-notification="handleShowingAlert"
        @system-is-disabled="handleSystemIsDisabled"
        @set-user-storage-auth-token="setUserStorageAuthToken"
        :id="dispatcherId"
        :supported-events="supportedEvents"
    />

    <div ref="loadingContainer"
         id="fullPageLoadingContainer"></div>

    <DevFooterBar/>

    <textarea class="hidden"
              id="clipboardDataHolder"
    />

  </section>
</template>

<script lang="ts">

import Nprogress                            from "@/scripts/Libs/Nprogress";
import VueRouter                            from "@/router/VueRouter";
import UserController                       from "@/scripts/Core/Controller/UserController";
import JwtTokenHandler                      from "@/scripts/Core/Security/JwtTokenHandler";
import EventDispatcherService               from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import ToastNotification, {ToastTypeEnum}   from "@/scripts/Libs/ToastNotification";

import {UserStateStore, userStateStore} from "@/scripts/Vue/Store/UserState";
import {systemDisabledStore}            from "@/scripts/Vue/Store/SystemDisabledState";

import DispatcherListener           from "@/components/App/DispatcherListener.vue";
import DevFooterBar                 from "@/components/Development/FooterBar/FooterBar.vue";
import MessageBar                   from "@/components/System/MessageBar/MessageBar.vue";
import SystemDisabledBar            from "@/components/System/SystemDisabledBar/SystemDisabledBar.vue";

import StringTypeProcessor    from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import TranslationsProvider   from "@/scripts/Vue/Provider/TranslationsProvider";
import JwtService             from "@/scripts/Core/Services/Security/JwtService";
import LocalStorageService    from "@/scripts/Core/Services/Storage/LocalStorageService";

import {Component}     from "vue";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {ActiveLoader}  from "vue-loading-overlay";

let userController  = new UserController();
let jwtTokenHandler = new JwtTokenHandler();

import "@/assets/scss/app.scss";

export default {
  data(): ComponentData {
    return{
      systemDisabledState: systemDisabledStore(),
      userStateStore: null as null | UserStateStore,
      loader: null as null | ActiveLoader,
      isUserLoggedIn: userController.isUserLoggedIn(),
      routerPaths: {
        logout            : VueRouter.ROUTE_PATH_LOGOUT,
        register          : VueRouter.ROUTE_PATH_REGISTER,
        login             : VueRouter.ROUTE_PATH_LOGIN,
      },
      dispatcherId    : EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID,
      supportedEvents : EventDispatcherService.ALL_SUPPORTED_EVENTS_APP_DISPATCHER,
    }
  },
  components: {
    DevFooterBar,
    MessageBar,
    SystemDisabledBar,
    "dispatcher-listener": DispatcherListener,
  },
  computed: {
    /**
     * @description check if the full loader is on
     */
    isFullLoaderOn(): boolean {
      return (null !== this.loader);
    }
  },
  methods: {
    /**
     * @description returns the root of the logged-in user view,
     *              meaning that this ref represents the current page view content (besides sidebars etc.)
     */
    getLoggedInUserViewRef(): Component {
      return this.$root.$refs.appRouterView.$refs.loggedInRouterViewComponent;
    },
    /**
     * @description will handle the user logout action
     */
    handleLogout(): void {
      jwtTokenHandler.invalidateTokenAndRedirectUser();
    },
    /**
     * @description handle the successful login logic
     */
    handleLoginSuccess():void {
      this.isUserLoggedIn = userController.isUserLoggedIn();
    },
    /**
     * @description handles the user invalidation event
     *
     * @see JwtTokenHandler.invalidateTokenAndRedirectUser
     * @see EventDispatcherService.emitShowNotification
     */
    handleUserInvalidated(): void {
      this.isUserLoggedIn = false;
    },
    /**
     * @description forces refreshing user state store (global state of user)
     */
    handleUserStoreRefresh(): void {
      this.userStateStore.refreshUserData();
    },
    /**
     * @description handle showing full-page-loader
     *
     * @see BeforeUnloadEvent.startListening
     * @see EventDispatcherService.emitShowFullPageLoader
     */
    handleShowFullPageLoader(): void {
      // need to check if other loader is already running, else causes some endless spinner instances
      if (this.isFullLoaderOn) {
        return;
      }

      this.loader = this.$loading.show({
        container       : this.$refs.loadingContainer,  // which element will be used to put the loader in it
        loader          : "spinner",                    // loader type
        isFullPage      : true,                         // will center on page
        color           : 'rgb(59, 130, 246)',          // color of the animation
        width           : 100,                          // height and width of the loader animations themself
        height          : 100,                          // height and width of the loader animations themself
        backgroundColor : "white",                      // overlay color
        opacity         : 0.75                          // overlay opacity
      });
    },
    /**
     * @description will handle showing top bar loader
     */
    showBarLoader(): void {
      Nprogress.start();
    },
    /**
     * @description will handle hiding top bar loader
     */
    hideBarLoader(): void {
      Nprogress.done();
    },
    /**
     * @description handle hiding full-page-loader
     *
     * @see EventDispatcherService.emitHideFullPageLoader
     */
    handleHideFullPageLoader(): void {
      if (this.loader !== null) {
        this.loader.hide();
        this.loader = null;
      }
    },
    /**
     * @description handles showing the alert which is a small bar with notification message
     */
    handleShowingAlert(alertType: string = ToastTypeEnum.info, message: string | null = null, stringToTranslate: string | null = null, autoClose = true): void {
      if( StringTypeProcessor.isEmptyString(message) ){

        message = TranslationsProvider.FALLBACK_SAFETY_MESSAGE;
        if( !StringTypeProcessor.isEmptyString(stringToTranslate) ){
          message = this.$t(stringToTranslate);
        }
      }

      ToastNotification.showAlert(alertType, message, autoClose);
    },
    /**
     * @description will update the system disabled store:
     *              - sets the isDisabled to true,
     *              - resets rest of fields,
     *              - sets the message that will be displayed on the bar,
     */
    handleSystemIsDisabled(message: string): void {
      this.systemDisabledState.isDisabled = true;
      this.systemDisabledState.isSoonDisabled = false;
      this.systemDisabledState.message = message;
    },
    /**
     * @description sets auth token on user storage
     */
    setUserStorageAuthToken(token): void {
      this.userStateStore.token = token;
    },
    /**
     * @description handles uploading files on behalf of EasyEmail
     */
  },
  mounted(): void {
    this.userStateStore = userStateStore();
    if (this.userStateStore.isLoggedIn()) {
      if ((new JwtService()).isTokenExpired(LocalStorageService.getAuthToken())) {
        jwtTokenHandler.invalidateTokenAndRedirectUser();
        return;
      }

      this.userStateStore.loadUserData()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main-page-wrapper {
  position: relative;
}

/** Full Page Loader - this changes are necessary as the external plugin is a bit broken */
#fullPageLoadingContainer{
  .vld-container, .vld-background {
    top: 0;
    position: absolute;
    height: 100%;
    width: 100vw;
    z-index: 99999999999999;
  }

  .vld-icon {
    position: fixed;
    top: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    z-index: 99999999999;
  }
}

.router-view-enter-from {
  opacity: 0;
}

.router-view-enter-active {
  transition: opacity 300ms ease-in;
}

</style>
