<template>
  <div class="flex flex-col align-self-baseline mt-2 md:mt-0 w-full">
    <h5 class="mb-4 text-white text-left align-self-center text-2xl md:text-normal">
      {{ $t('infoPage.footerSection.menu.header') }}
    </h5>
    <ul class="footer-menu flex flex-col justify-start md:justify-center md:flex-row text-left md:align-self-center align-self-baseline">
      <li>
        <a
            class="text-white footer-link"
            @click.prevent="goToSection($event)"
            data-target-selector="#home-section"
        >
          {{ $t('infoPage.menu.home.label') }}
        </a>
      </li>
      <li>
        <a
            class="text-white footer-link"
            @click.prevent="goToSection($event)"
            data-target-selector="#about-us-section"
        >
          {{ $t('infoPage.menu.about.label') }}
        </a>
      </li>
      <li>
        <a
            class="text-white footer-link"
            @click.prevent="goToSection($event)"
            data-target-selector="#faq"
        >
          {{ $t('infoPage.menu.faq.label') }}
        </a>
      </li>
      <li>
        <a
            class="text-white footer-link"
            @click.prevent="goToLoginHandler"
        >
          {{ $t('infoPage.menu.login.label') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import LoginPageHandlerMixin  from "@/views/InfoLandingPage/Components/Mixin/LoginPageHandlerMixin.vue";
import SectionNavigationMixin from "@/views/InfoLandingPage/Components/Mixin/SectionNavigationMixin.vue";

export default {
  mixins: [
    LoginPageHandlerMixin,
    SectionNavigationMixin,
  ],
  emits: [
    "showCreditsModal",
    "showRoadmapModal",
  ]
}
</script>

<style lang="scss">
.footer-title {
  z-index: 2;
  position: relative;
}

.footer-link {
  z-index: 999999 !important;
  @apply hover:opacity-75 duration-75 cursor-pointer
}
</style>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';

.footer-menu {
  margin-left: 20px;
}

@media screen and (min-width: $tabletBreakingPointPx + 'px') {
  .footer-menu {
    margin-left: 0;
  }
}

@media screen and (min-width: $tabletBreakingPointPx + 'px') {
  .footer-menu li::after {
    content: "|";
    margin-left: 10px;
    margin-right: 5px;
  }
}
</style>