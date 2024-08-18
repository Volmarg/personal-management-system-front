<template>
  <div v-click-away="hideSidebar">
    <div class="left-sidebar left-sidebar-1"
    >

      <div class="logo flex-column">
        <router-link :to="routePaths.home" class="align-self-center">
          <img src="logo.svg" />
        </router-link>
      </div>

      <hr class="mb-4 opacity-50 " />

      <!-- Group elements -->
      <ul>
        <li class="l0"><Goals /></li>
        <li class="l0"><Todo /></li>
        <li class="l0"><Notes /></li>
        <li class="l0"><Contacts /></li>
        <li class="l0"><Passwords /></li>
        <li class="l0"><Achievements /></li>
        <li class="l0"><Calendar /></li>
        <li class="l0"><Issues /></li>
        <li class="l0"><Travels /></li>
        <li class="l0"><Payments /></li>
        <li class="l0"><Shopping /></li>
        <li class="l0"><Job /></li>
        <li class="l0"><Reports /></li>
        <li class="l0"><hr/></li>
        <li class="l0"><Files /></li>
        <li class="l0"><Images /></li>
        <li class="l0"><Video /></li>
        <li class="l0"><Upload /></li>
      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import Achievements from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Achievements.vue";
import Calendar from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Calendar.vue";
import Contacts from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Contacts.vue";
import Files from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Files.vue";
import Goals from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Goals.vue";
import Images from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Images.vue";
import Issues from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Issues.vue";
import Job from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Job.vue";
import Notes from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Notes.vue";
import Passwords from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Passwords.vue";
import Payments from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Payments.vue";
import Reports from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Reports.vue";
import Shopping from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Shopping.vue";
import Todo from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Todo.vue";
import Travels from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Travels.vue";
import Upload from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Upload.vue";
import Video from "@/components/LoggedIn/Navigation/SidebarComponents/Node/Video.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";
import ResponsiveVarsMixin       from "@/mixins/Responsive/ResponsiveVarsMixin.vue";
import VueRouter                 from "@/router/VueRouter";
import BaseError                 from "@/scripts/Core/Error/BaseError";
import {ComponentData}           from "@/scripts/Vue/Types/Components/types";

import BrowserDetection from "@/scripts/Core/Services/View/BrowserDetection";

export default {
  name: "InNavigationSidebar",
  data(): ComponentData {
    return {
      isMobileBrowser: BrowserDetection.isMobileBrowser(),
      routePaths: {
        home: VueRouter.ROUTE_PATH_HOME
      }
    }
  },
  methods: {
    /**
     * @description will handle hiding the left sidebar when user is on mobile,
     *              this was added due to menu being a bit of glitch-y on mobile (hamburger is not reachable)
     */
    hideSidebar(): void {
      if (window.innerWidth >= this.tabletBreakingPointPx) {
        return;
      }

      let event           = window.event as Event;
      let targetElement   = event.target as HTMLElement;

      let isAnyHamburgerElementClicked = (
              targetElement.classList.contains('hamburger-navbar-element')
          ||  targetElement.classList.contains('navbar-hamburger')
      );

      // prevent hiding sidebar when user clicks on hamburger
      if (isAnyHamburgerElementClicked) {
        return;
      }


      let navbarHamburger = document.querySelector('.navbar-hamburger');
      let domElement      = document.querySelector('[data-collapsed]') as Element;
      let isDataCollapsed = (domElement.getAttribute('data-collapsed') === "true");

      if (null === navbarHamburger) {
        throw new BaseError("Hamburger nav element was not found. Searched for class: `.navbar-hamburger`");
      }

      if (!isDataCollapsed) {
        navbarHamburger.dispatchEvent((new Event("click")));
      }
    }
  },
  mixins: [
    ResponsiveVarsMixin,
    SidebarMixin,
  ],
  components: {
    Achievements,
    Calendar,
    Contacts,
    Files,
    Goals,
    Images,
    Issues,
    Job,
    Notes,
    Passwords,
    Payments,
    Reports,
    Shopping,
    Todo,
    Travels,
    Upload,
    Video,
  }
}
</script>

<style lang="scss">

[data-collapsed="true"] .logo {
  padding: 0 !important;
  img {
    width: 50px;
  }
}

[data-collapsed="false"] .logo img{
  width: 52px !important;
}
</style>