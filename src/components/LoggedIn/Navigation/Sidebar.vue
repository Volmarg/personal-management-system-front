<template>
  <div v-click-away="hideSidebar">
    <div class="left-sidebar left-sidebar-1"
    >

      <div class="logo truncate">
        <router-link :to="routePaths.home">
          <img src="logo.svg" />
        </router-link>
      </div>

      <hr class="mb-4 opacity-50 " />

      <!-- Group elements -->
      <ul>
        <!-- Jobs-->
        <li class="l0">
            <single-dropdown-menu-element :label="$t('views.navbar.main.jobs.label')">
              <template #icon>
                <fa icon="suitcase"/>
              </template>

              <template #children>
                <single-menu-element :route-path="routePaths.jobs.jobSearch"
                                     :label="$t('views.navbar.main.jobs.children.jobSearch.label')"
                                     @click="onMenuElementClick"
                />

                <single-menu-element :route-path="routePaths.jobs.jobSearchResults"
                                     :label="$t('navbar.sidebar.jobs.children.searchResults.label')"
                                     @click="onMenuElementClick"
                />
                <single-menu-element :route-path="routePaths.jobs.jobApplications"
                                     :label="$t('views.navbar.main.jobs.children.jobApplications.label')"
                                     @click="onMenuElementClick"
                />
              </template>
            </single-dropdown-menu-element>
        </li>

        <!-- Email-->
        <li class="l0">
          <single-dropdown-menu-element :label="$t('views.navbar.main.email.label')">
            <template #icon>
              <fa icon="envelope-open-text"/>
            </template>

            <template #children>
              <single-menu-element :route-path="routePaths.mailing.template.builder"
                                   :label="$t('views.navbar.main.email.children.template.builder.label')"
                                   @click="onMenuElementClick"
              />
            </template>
          </single-dropdown-menu-element>
        </li>

        <!-- Payments -->
        <li class="l0">
          <single-dropdown-menu-element :label="$t('navbar.sidebar.payments.header')">
            <template #icon>
              <fa icon="wallet"/>
            </template>

            <template #children>
              <single-menu-element :route-path="routePaths.payments.overview"
                                   :label="$t('navbar.sidebar.payments.children.overview.label')"
                                   @click="onMenuElementClick"
              />
              <single-menu-element :route-path="routePaths.payments.pointShopHistory"
                                   :label="$t('navbar.sidebar.payments.children.pointShop.label')"
                                   @click="onMenuElementClick"
              />
            </template>
          </single-dropdown-menu-element>
        </li>

      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import ResponsiveVarsMixin       from "@/mixins/Responsive/ResponsiveVarsMixin.vue";
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";
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
        jobs: {
          jobApplications: VueRouter.ROUTE_PATH_JOB_APPLICATION,
          jobSearchResults: VueRouter.ROUTE_PATH_JOB_OFFER_SEARCH_RESULTS,
          jobSearch: VueRouter.ROUTE_PATH_JOB_SEARCH,
        },
        mailing: {
          template: {
            builder: VueRouter.ROUTE_PATH_EMAIL_TEMPLATE_BUILDER
          },
        },
        payments: {
          overview: VueRouter.ROUTE_PATH_PAYMENTS_OVERVIEW,
          pointShopHistory: VueRouter.ROUTE_PATH_PAYMENTS_POINT_SHOP_HISTORY,
        },
        home: VueRouter.ROUTE_PATH_HOME
      }
    }
  },
  methods: {
    /**
     * @description handle menu element click
     *              - if it's mobile device then hide menu when url menu element gets clicked,
     */
    onMenuElementClick() {
      this.$view.scrollContentOfElement(window);
      if (!this.isMobileBrowser) {
        return;
      }

      this.hideSidebar();
    },
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
  ],
  components: {
    "single-dropdown-menu-element" : SingleDropdownMenuElement,
    "single-menu-element"          : SingleMenuElement,
  }
}
</script>

<style lang="scss">

[data-collapsed="true"] .logo {
  padding: 0 !important;
  img {
    width: 40px;
    margin-left: 10px !important;
  }
}

[data-collapsed="false"] .logo img{
  width: 40px !important;
  margin-left: 0;
}
</style>