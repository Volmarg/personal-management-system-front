<template>
  <section class="pt-5">
    <div class="col-sm-12">
      <div class="screenshots-slider popup-gallery">
        <div class="slider-wrapper">

<!--          <Splide-->
<!--              :options="slider.options"-->
<!--              class="splide-wrapper"-->
<!--          >-->
<!--            <SplideSlide>-->
<!--              <img src="/src/assets/img/info-page/section/info/info/carousel/carousel1.png" class="slider-single-image" />-->
<!--            </SplideSlide>-->
<!--            <SplideSlide>-->
<!--              <img src="/src/assets/img/info-page/section/info/info/carousel/carousel2.png" class="slider-single-image" />-->
<!--            </SplideSlide>-->
<!--            <SplideSlide>-->
<!--              <img src="/src/assets/img/info-page/section/info/info/carousel/carousel3.png" class="slider-single-image" />-->
<!--            </SplideSlide>-->
<!--          </Splide>-->

        </div>
      </div>
    </div>
    <small class="italic">{{ $t('infoPage.section.home.caption') }}</small>

  </section>
</template>

<script lang="ts">

import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css/skyblue';

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * @link https://splidejs.com/integration/vue-splide/
 * @link https://splidejs.com/guides/transition/
 */
export default {
  data(): ComponentData {
    return {
      slider: {
        options: {
          speed: 1000,
          type: 'fade'
        }
      }
    }
  },
  components: {
    Splide,
    SplideSlide,
  }
}
</script>

<style lang="scss">
.splide {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 20px;
  max-width: 900px !important;
  align-self: center;
}

.splide__arrows path {
  fill: rgb(55, 125, 255) !important;
}

.splide__pagination__page.is-active {
  @apply bg-blue-500
}

.slider-wrapper {
  display: flex;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
}

.splide-wrapper{
  @apply border border-gray-100
}
</style>
