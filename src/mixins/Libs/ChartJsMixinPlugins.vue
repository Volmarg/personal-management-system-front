<script lang="ts">
/**
 * @link https://github.com/chartjs/awesome - list of plugins and tools for chartjs
 */

/** @link https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html */
import dataLabelsPlugin from 'chartjs-plugin-datalabels';

/**
 * @link https://chartjs-plugin-crosshair.netlify.app/samples/ - only samples
 * @link https://github.com/AbelHeinsbroek/chartjs-plugin-crosshair/blob/master/docs/options.md - someone recovered original docs
 * @link https://www.npmjs.com/package/chartjs-plugin-crosshair - some npm docs
 */
import crosshairPlugin from 'chartjs-plugin-crosshair';

/** @link https://github.com/kurkle/chartjs-plugin-autocolors?tab=readme-ov-file */
import autoColorPlugin from 'chartjs-plugin-autocolors';

import Chart from "chart.js/auto";

/**
 * @description handles setting / fixing plugins for chart js
 */
export default {
  methods: {
    /**
     * @description bunch of fixes to make the crosshair plugin work, this is needed because crosshair starts crying
     *              that some props don't exist, can't be read etc.
     *
     * @link https://github.com/AbelHeinsbroek/chartjs-plugin-crosshair/issues/119
     */
    fixAndRegisterCrosshair(): void {
      let CustomCrosshairPlugin = function (plugin) {
        let originalAfterDraw = plugin.afterDraw;
        let originalIgnoreNextEvents = plugin.ignoreNextEvents;

        plugin.afterDraw = function(chart, easing) {
          if (chart && chart.crosshair) {
            originalAfterDraw.call(this, chart, easing);
          }
        };

        plugin.ignoreNextEvents = function(chart, easing) {
          if (chart && chart.crosshair) {
            originalIgnoreNextEvents.call(this, chart, easing);
          }
        };

        return plugin;
      };

      Chart.register(CustomCrosshairPlugin(crosshairPlugin));
    },
    /**
     * @description registers all the plugins used by chart js
     */
    registerPlugins(): void {
      Chart.register(dataLabelsPlugin);
      Chart.register(autoColorPlugin);
      this.fixAndRegisterCrosshair()
    },
  },
  created() {
    this.registerPlugins()
  }
}
</script>