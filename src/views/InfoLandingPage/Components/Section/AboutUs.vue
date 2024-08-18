<template>
  <section
      class="pt-0"
      id="about-us-section"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="lg:w-8/12 pr-3 pl-3">
          <div class="title-box mb-0">
            <h2>
            {{ $t('infoPage.section.aboutUs.header') }}
          </h2>
          </div>
        </div>
      </div>
      <div class="row">

        <section class="u-align-center u-clearfix u-grey-5 u-section-1 pl-2 pr-2 pt-0 w-full">
          <div class="u-clearfix u-sheet u-valign-bottom-xs u-sheet-1">
            <div class="wrap-xy u-align-center-xs u-container-style u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-group u-radius-20 u-shape-round u-white u-group-1">
              <div class="wrap-xyz u-container-layout u-valign-top u-container-layout-1 pl-3 pr-3 pt-6 about-us-content-wrapper">
                <span class="wrap-xyzz u-icon u-icon-circle u-text-palette-1-base u-icon-1">
                  <svg
                      class="u-svg-content"
                      viewBox="0 0 409.294 409.294"
                      id="svg-ca89"
                  >
                      <path d="m233.882 29.235v175.412h116.941c0 64.48-52.461 116.941-116.941 116.941v58.471c96.728 0 175.412-78.684 175.412-175.412v-175.412z"></path>
                      <path d="m0 204.647h116.941c0 64.48-52.461 116.941-116.941 116.941v58.471c96.728 0 175.412-78.684 175.412-175.412v-175.412h-175.412z"></path>
                    </svg>
                  </span>
                <p class="about-us-paragraph">
                  <i v-html="$t('infoPage.section.aboutUs.paragraphs.one')"></i>
                </p>

                <p class="about-us-paragraph">
                  <i v-html="$t('infoPage.section.aboutUs.paragraphs.two')"></i>
                </p>

                <p class="about-us-paragraph">
                  <i v-html="$t('infoPage.section.aboutUs.paragraphs.three')"></i>
                </p>

                <h5
                    class="u-custom-font u-font-montserrat u-text u-text-default u-text-2 person-name-text"
                >
                  - Dariusz (Volmarg) -
                </h5>

                <!-- disabled on purpose, stays because if needed then it can be easily turned back on -->
                <div
                    class="mt-10"
                    v-if="false"
                />
              </div>
            </div>
            <div class="wrapper-a u-image u-image-circle u-image-1"
                 :style="{
                    'background-image': `url(${testimonial.imagePath})`,
                 }"
            ></div>
          </div>
        </section>

      </div>
    </div>
  </section>

  <ExternalStyles />
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import ExternalStyles from "@/views/InfoLandingPage/Components/Section/Components/AboutUs/ExternalStyles.vue";

/**
 * Based on
 * - {@link https://website2655826.nicepage.io/Contact.html?version=c5ce7ba8-614e-4d96-9d96-b0641e0ddb16}
 */
export default {
  data(): ComponentData {
    return {
      testimonial: {
        imagePath: '/src/assets/img/info-page/section/info/about-us/product-owner.jpg'
      }
    }
  },
  components: {
    ExternalStyles
  }
}
</script>

<style scoped lang="scss">
@import '/src/assets/scss/info-page/all.scss';

@import '/src/assets/scss/responsive.scss';

/* this is self written css */
.person-name-text {
  font-style: italic;
  padding-bottom: 35px;
}

@media screen and (max-width: $tabletBreakingPointPx + 'px'){
  .u-image {
    margin-bottom: -100px !important;
  }
}

.about-us-paragraph {
  margin-top: 20px;
  text-align: left;
  width:      100%;
}
</style>

<style lang="scss">

$circleImageAspectPx: 130px;
.u-image-circle {
  width: $circleImageAspectPx;
  height: $circleImageAspectPx;
}
</style>