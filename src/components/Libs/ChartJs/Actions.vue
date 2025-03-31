<template>
  <div class="flex flex-col md:flex-row justify-end">
    <MediumButtonWithIcon @button-click="zoom({x: 1.1})"
                          :text="$t('reports.common.zoom.increase', {'percent': 10})"
                          :margin-right-class-number="1"
                          class="w-full md:w-auto m-0-force"
                          button-classes="w-full md:w-auto calendar-view"
                          text-classes="text-center w-full"
    />

    <MediumButtonWithIcon @button-click="zoom({x: 0.9})"
                          :text="$t('reports.common.zoom.decrease', {'percent': 10})"
                          :margin-right-class-number="1"
                          class="w-full md:w-auto m-0-force"
                          button-classes="w-full md:w-auto calendar-view"
                          text-classes="text-center w-full"
    />

    <MediumButtonWithIcon @button-click="resetZoom"
                          :text="$t('reports.common.zoom.reset')"
                          :margin-right-class-number="1"
                          class="w-full md:w-auto m-0-force"
                          button-classes="w-full md:w-auto calendar-view"
                          text-classes="text-center w-full"
    />

  </div>
</template>

<script lang="ts">

import {zoom} from "chartjs-plugin-zoom";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * @description keep in mind that zoom in/out + reset zoom is very glitchy due to the usage of crosshair plugin.
 */
export default {
  data(): ComponentData {
    return {
      chartStates: new WeakMap(),
    }
  },
  props: {
    chartInstance: {
      type: Object,
      required:true,
    }
  },
  components: {
    MediumButtonWithIcon,
  },
  methods: {
    /**
     * @description will zoom the chart in, or out
     */
    zoom(amount) {
      zoom(this.chartInstance, amount);
    },
    /**
     * @description let's face it, this looks retarded. The problem is that there are these 2 plugins installed for charts,
     *              - crosshair,
     *              - zoom,
     *
     *              Both provide the "reset zoom" functionality. but it just doesn't work the way it should, so I found
     *              out that You can't zoom out over the initial zoom, so that's enough to add necessary functionality.
     *              Tried re-creating / adjusting the code under the resetZoom from plugins, but it's way too big mess.
     *
     *              So in the end, this function will set zoom back to the initial one. Keep in mind that this solution
     *              might not work for all charts.
     */
    resetZoom(): void {
      for (let idx in [...Array(5).keys()]) {
        this.$nextTick(() => {
          this.zoom({x:-999999999});
        })
      }
    },
  },
}
</script>

<style lang="scss">
.medium-button-with-icon-wrapper {
  margin-bottom: 5px !important;
  margin-top: 5px !important;
}
</style>