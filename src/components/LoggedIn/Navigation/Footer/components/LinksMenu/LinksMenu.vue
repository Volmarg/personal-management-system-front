<template>
  <div>

    <ul class="menu">
      <li class="menu__item">
        <a
            class="menu__link"
            @click.prevent="goInfoPageAndSection($event)"
            data-target-selector="#home-section"
        >
          {{ $t('infoPage.menu.home.label') }}
        </a>
      </li>

      <li class="menu__item">
        <a
            class="menu__link"
            @click.prevent="goInfoPageAndSection($event)"
            data-target-selector="#about-us-section"
        >
          {{ $t('infoPage.menu.aboutUs.label') }}
        </a>
      </li>

      <li class="menu__item">
        <a
            class="menu__link"
            @click.prevent="goInfoPageAndSection($event)"
            data-target-selector="#offer"
        >
          {{ $t('infoPage.menu.whatWeOffer.label') }}
        </a>
      </li>

      <li class="menu__item">
        <a
            class="menu__link"
            @click.prevent="goInfoPageAndSection($event)"
            data-target-selector="#pricing"
        >
          {{ $t('infoPage.menu.pricing.label') }}
        </a>
      </li>

      <li class="menu__item">
        <a
            class="menu__link"
            @click.prevent="goInfoPageAndSection($event)"
            data-target-selector="#faq"
        >
          {{ $t('infoPage.menu.faq.label') }}
        </a>
      </li>

    </ul>

  </div>
</template>

<script lang="ts">
import DomService     from "@/scripts/Core/Services/DomService";
import VueRouter      from "@/router/VueRouter";
import PromiseService from "@/scripts/Core/Services/Promise/PromiseService";

export default {
  methods: {
    /**
     * @description will go to target section
     */
    async goToSection(event: PointerEvent): Promise<void> {
      let clickedElement = event.target as HTMLElement | null;

      /**
       * @description the promise based waiting is needed, otherwise going to section won't work properly in here
       *              that's why waiting for home-section from info page to be loaded.
       */
      await PromiseService.buildPeriodicallyCheckedPromise(() => {
        return !!document.getElementById('home-section');
      })

      DomService.goToSection(clickedElement, -150)
    },
    /**
     * @description goes to info page and then scrolls in view to the clicked section
     */
    async goInfoPageAndSection(event: PointerEvent): Promise<void> {
      await this.$router.push(VueRouter.ROUTE_PATH_INFO);
      this.goToSection(event);
    }
  }
}
</script>

<style lang="scss">
.menu__link {
  color: white;
  opacity: 1 !important;

  &:hover {
    opacity: 0.5 !important;
  }
}
</style>