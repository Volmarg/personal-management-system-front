<template>
  <section class="gradient-top">
    <div class="container">
      <div class="row justify-content-center">
        <div class="lg:w-8/12 pr-3 pl-3">
          <div class="title-box"><h2>
            {{ offerHeader }}
          </h2>
            <p>
              {{ offerDescription }}
            </p>
          </div>
        </div>
        <div>

          <Splide :options="slider.options" aria-label="My Favorite Images">
            <slot name="sliderContent"></slot>
          </Splide>

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Splide} from "@splidejs/vue-splide";

import '@splidejs/vue-splide/css/skyblue';
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

export default {
  data(): ComponentData {
    return {
      slider: {
        options: {
          speed: 1000,
          type: 'slide',
          perPage: 2,
          rewind: true,
          gap: "20px"
        }
      }
    }
  },
  props: {
    offerHeader: {
      type: String,
      required: true,
    },
    offerDescription: {
      type: String,
      required: true,
    },
  },
  mixins: [
    ResponsiveVarsMixin
  ],
  components: {
    Splide
  },
  methods: {
    /**
     * @description modifies the options on fly
     */
    modifySliderOptions(): void {
      this.slider.options.perPage = 2;
      if (this.isTabletBreakingPoint) {
        this.slider.options.perPage = 1;
      }
    },
    attachResizeEvent(): void {
      window.addEventListener("resize", () => {
        this.modifySliderOptions();
      })
    }
  },
  created(): void {
    this.modifySliderOptions();
    this.attachResizeEvent();
  }
}
</script>

<style lang="scss" scoped>
.gradient-top {
  background-image: url(/src/assets/img/info-page/gradient-wave.png);
  background-position: 0 0 !important;
  background-repeat: no-repeat !important;
  position: relative;

  &:before {
    content: "";
    background: linear-gradient(180deg, rgba(50, 119, 247, .08), #FFFFFF 60%);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>