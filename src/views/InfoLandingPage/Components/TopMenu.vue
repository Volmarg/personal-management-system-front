<template>
  <header id="main-header" class="menu-sticky">
    <div class="container">
      <div class="row">
        <div class="sm:w-full pl-3 pr-3">
          <nav class="navbar navbar-expand-lg navbar-light">
            <a
                href="#"
                class="navbar-brand cursor-default"
                @click.prevent
            >
              <img src="logo.svg"
                   alt="img"
                   class="img-fluid sticky-logo top-bar-logo"></a>
            <button type="button"
                    class="navbar-toggler">
              <span
                  id="menu-btn"
                  class="menu-btn d-inline-block"
                  @click="isHamburgerMenuVisible = !isHamburgerMenuVisible"
              >
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
              </span>
              <span class="ion-navicon"></span>
            </button>
            <div
                id="navbarSupportedContent"
                class="collapse navbar-collapse"
                :class="{
                  'show fade-in': isHamburgerMenuVisible,
                  'fade-out': !isHamburgerMenuVisible
                }"
                v-click-away="handleMenuClickAway"
            >
              <ul class="navbar-nav mr-auto w-100 justify-content-end">
                <LoginLink v-if="isTabletBreakingPoint"/>
                <li class="nav-item">
                  <a
                      @click.prevent="goToSection($event); hideHamburgerMenu()"
                      class="nav-link"
                      data-target-selector="#home-section"
                  >
                  {{ $t('infoPage.menu.home.label') }}
                </a>
                </li>
                <li class="nav-item">
                  <a
                      @click.prevent="goToSection($event); hideHamburgerMenu()"
                      class="nav-link"
                      data-target-selector="#about-us-section"
                  >
                    {{ $t('infoPage.menu.aboutUs.label') }}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                      @click.prevent="goToSection($event); hideHamburgerMenu()"
                      class="nav-link"
                      data-target-selector="#offer"
                  >
                  {{ $t('infoPage.menu.whatWeOffer.label') }}
                </a></li>
                <li class="nav-item">
                  <a
                      @click.prevent="goToSection($event); hideHamburgerMenu()"
                      class="nav-link"
                      data-target-selector="#pricing"
                  >
                  {{ $t('infoPage.menu.pricing.label') }}
                </a></li>
                <li class="nav-item">
                  <a
                      @click.prevent="goToSection($event); hideHamburgerMenu()"
                      class="nav-link"
                      data-target-selector="#faq"
                  >
                  {{ $t('infoPage.menu.faq.label') }}
                </a></li>
                <li class="nav-item">
                  <a
                      @click.prevent="$emit('showCreditsModal'); hideHamburgerMenu()"
                      class="nav-link"
                  >
                  {{ $t('infoPage.menu.credits.label') }}
                </a></li>
                <li class="nav-item">
                  <a
                      @click.prevent="$emit('showRoadmapModal'); hideHamburgerMenu()"
                      class="nav-link"
                  >
                  {{ $t('infoPage.menu.roadmap.label') }}
                </a></li>
                <LoginLink v-if="!isTabletBreakingPoint"/>
              </ul>
            </div>

          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import SectionNavigationMixin from "@/views/InfoLandingPage/Components/Mixin/SectionNavigationMixin.vue";
import ResponsiveVarsMixin    from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import LoginLink from "@/views/InfoLandingPage/Components/TopMenu/LoginLink.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isCreditsModalVisible: false,
      isHamburgerMenuVisible: false,
    }
  },
  mixins: [
    SectionNavigationMixin,
    ResponsiveVarsMixin
  ],
  emits: [
    "showCreditsModal",
    "showRoadmapModal"
  ],
  components: {
    LoginLink
  },
  methods: {
    /**
     * @description hide hamburger menu
     */
    hideHamburgerMenu(): void {
      this.isHamburgerMenuVisible = false
    },
    /**
     * @description Handle user clicking on the hamburger menu
     */
    handleMenuClickAway(event: MouseEvent): void {
      let targetElement = event.target as HTMLElement;

      // user clicks on the hamburger button itself
      if (targetElement.classList.contains('menu-btn')) {
        return;
      }

      // user clicks on the hamburger lines
      if (targetElement.classList.contains('line') && targetElement.parentElement.classList.contains('menu-btn')) {
        return;
      }

      // menu is not yet clicked so prevent denying it's opening
      if (!this.isHamburgerMenuVisible) {
        return;
      }

      this.hideHamburgerMenu();
    }
  }
}
</script>

<style lang="scss" scoped>
$animationTime: 300ms;
.top-bar-logo {
  width: 80% !important;
}

.show.fade-in{
  animation-name: fade-in;
  animation-duration: $animationTime;
}

.fade-out {
  animation-name: fade-out;
  animation-duration: $animationTime;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

</style>