<script lang="ts">
import ChartJsMixinPlugins from "@/mixins/Libs/ChartJsMixinPlugins.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Chart, {ChartConfiguration} from "chart.js/auto";
import {shallowRef}                from "vue";

/**
 * Based on:
 * - {@link https://www.chartjs.org/docs/latest/}
 */
export default {
  data(): ComponentData {
    return {
      chartInstance: null,
    }
  },
  mixins: [
    ChartJsMixinPlugins
  ],
  methods: {
    /**
     * @description creates the charts, renders is
     */
    createChart(config: ChartConfiguration, canvas: HTMLCanvasElement | undefined | null): void {
      if (!canvas) {
        return;
      }

      this.configureChart();

      /**
       * @description the shallow ref is required because otherwise chart fa
       */
      this.chartInstance = shallowRef(
          new Chart(canvas, config)
      );
    },
    configureChart(): void {
      let usedFontFamily = "Poppins";

      /**
       * @description overwrite some of the default configurations for the need of this project.
       *              Not possible to create method from this which returns an Object because the
       *              whole `defaults` prop is a readonly object, can only change its properties directly.
       */
      Chart.defaults.font.family = `'${usedFontFamily}'`;

      /**
       * @description registers handler which draws text inside the canvas when no data is present
       */
      let message = this.$t('generic.noDataToDisplay');
      Chart.register({
        id: 'NoData',
        afterDraw: function (chart) {
          /**
           * @description This not only checks the dataset length but also the data in each set.
           *              If there is no data across all datasets, the message will display
           */
          if (
              chart.data.datasets
                  .map((d) => d.data.length)
                  .reduce((p, a) => p + a, 0) === 0
          ) {
            // No data is present
            const ctx    = chart.ctx;
            const width  = chart.width;
            const height = chart.height;
            chart.clear();

            ctx.save();
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';
            ctx.font         = `2rem ${usedFontFamily}`;

            ctx.fillText(message, width / 2, height / 2);
            ctx.restore();
          }
        },
      });

    },
    /**
     * @description destroys current chart instance
     */
    destroyChart(): void {
      if (!this.chartInstance) {
        return;
      }

      this.chartInstance.destroy();
    },
    /**
     * @description refreshes the chart
     */
    refreshChart(config: ChartConfiguration, canvas: HTMLCanvasElement | undefined | null): void {
      if(!canvas){
        return;
      }

      /**
       * @description update the chart, will remove old chart and render new one with new data.
       *              even tho there is this method in documentation `this.chartInstance.update()` - it just crashes in here
       */
      this.chartInstance.destroy();
      this.createChart(config, canvas);
    }
  },
}
</script>

<style lang="scss">
.chart-reset-zoom {
  @apply hidden
}
</style>