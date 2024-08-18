<template>
  <div>
    <TopMenu
        @show-credits-modal="isCreditsModalVisible = true"
        @show-roadmap-modal="isRoadMapModalVisible = true"
    />
    <HomeSection />
    <div class="main-content">
      <!-- keep in min that the section ids must be kept in sync with backend emails menu -->
      <ScreensCarouselSection />
      <AboutUs />
      <InfoSections />
      <Faq />
      <Footer
          @show-credits-modal="isCreditsModalVisible = true"
          @show-roadmap-modal="isRoadMapModalVisible = true"
      />
      <BackToTop />
    </div>

    <Credits
        :force-is-visible="isCreditsModalVisible"
        @modal-closed="isCreditsModalVisible = false"
    />
    <RoadMap
        :force-is-visible="isRoadMapModalVisible"
        @modal-closed="isRoadMapModalVisible = false"
    />
  </div>
</template>

<script lang="ts">
import Credits from "@/views/InfoLandingPage/Components/Modal/Credits.vue";
import RoadMap from "@/views/InfoLandingPage/Components/Modal/RoadMap.vue";

import TopMenu   from "@/views/InfoLandingPage/Components/TopMenu.vue";
import BackToTop from "@/views/InfoLandingPage/Components/BackToTop.vue";
import Footer    from "@/views/InfoLandingPage/Components/Footer.vue";

import Faq                    from "@/views/InfoLandingPage/Components/Section/Faq.vue";
import HomeSection            from "@/views/InfoLandingPage/Components/Section/Home.vue";
import ScreensCarouselSection from "@/views/InfoLandingPage/Components/Section/ScreensCarousel.vue";
import AboutUs                from "@/views/InfoLandingPage/Components/Section/AboutUs.vue";
import InfoSections           from "@/views/InfoLandingPage/Components/Section/Info.vue";

import {ComponentData}     from "@/scripts/Vue/Types/Components/types";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import WindowService       from "@/scripts/Core/Services/WindowService";

export default {
  data(): ComponentData {
    return {
      isCreditsModalVisible: false,
      isRoadMapModalVisible: false,
    }
  },
  components: {
    Faq,
    InfoSections,
    BackToTop,
    Footer,
    AboutUs,
    ScreensCarouselSection,
    HomeSection,
    TopMenu,
    Credits,
    RoadMap
  },
  methods: {
    /**
     * @description extracts query param which indicates that view should be scrolled to certain dom id,
     *              this was added because backend provides urls to the info page and that's the only way
     *              to make the anchors work in vue.
     *
     *              It's a bit dirty but window.load && document.ready are not working at all here
     */
    goToQueryId(): void {
      for (let paramName of Object.keys(this.$route.query)) {
        if (
                paramName === "goTo"
            && !StringTypeProcessor.isEmptyString(this.$route.query.goTo)
        ) {
          let targetElementId = this.$route.query[paramName];
          let targetElement = document.getElementById(targetElementId);
          if (!targetElement) {
            return;
          }

          this.$nextTick(() => {
            setTimeout(() => {
              WindowService.scrollTo(`#${targetElementId}`, -150)
            }, 200); // timeout is needed else the scroll happens instantly after page is opened and goes to wrong place
          })

        }
      }
    }
  },
  mounted() {
    this.goToQueryId();
  }
}
</script>

<style lang="scss">
@import '/src/assets/scss/info-page/all.scss';

.main-page-wrapper {
  padding-bottom: 0;
}
</style>