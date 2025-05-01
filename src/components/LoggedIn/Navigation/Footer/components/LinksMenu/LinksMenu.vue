<template>
  <div>

    <ul class="menu">
      <li class="menu__item">
        <a
            class="menu__link"
            href="https://volmarg.github.io/"
            target="_blank"
            data-target-selector="#faq"
        >
          {{ $t('navbar.footer.documentation.label') }}
        </a>
      </li>

    </ul>

  </div>
</template>

<script lang="ts">
import DomService     from "@/scripts/Core/Services/DomService";
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