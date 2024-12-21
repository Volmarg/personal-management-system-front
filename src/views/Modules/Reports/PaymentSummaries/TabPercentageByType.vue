<template>
  <div>
    <h2 class="text-2xl mb-1">{{ $t('reports.paymentCharts.tabs.percentageByType.header') }}</h2>

    <div class="chart-wrapper lg:p-10 xl:p-20 flex justify-end flex-col">
      <canvas
          ref="chartWrapper"
          height="100%"
          style="max-height: 400px"
      ></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import ChartJsMixin from "@/mixins/Libs/ChartJsMixin.vue";

import { ChartConfiguration } from "chart.js/auto";
import { color } from 'chart.js/helpers';

import {ComponentData}      from "@/scripts/Vue/Types/Components/types";
import SymfonyReportsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyReportsRoutes";

export default {
  data(): ComponentData {
    return {
      yearFilter: null,
      allYears: [],
      /**
       * @description temp data
       */
      chartData: [],
    }
  },
  mixins: [
    ChartJsMixin
  ],
  computed: {
    /**
     * @description returns all the used labels
     */
    labels(): Array<string> {
      return this.chartData.map((data: Record<string, string | number>) => {return data.label});
    },
    /**
     * @description returns all the used values
     */
    values(): Array<string> {
      return this.chartData.map((data: Record<string, string | number>) => {return data.value});
    },
    /**
     * @description configuration of the chart, it's options etc.
     */
    chartConfig(): ChartConfiguration {
      return {
        type: 'pie',
        data: {
          labels: this.labels,
          datasets: [
            {
              borderColor: 'rgba(0,0,0,0.34)',
              data: this.values,
            }
          ]
        },
        options: {
          /**
           * @description scales are needed here because it seems like there is some bug in charts,
           *              if the scales and their types are not set then error is thrown, but on the
           *              other hand don't want to have these charts here so hiding them,
           */
          scales: {
            x: {
              type: 'linear',
              display: false,
            },
            y: {
              type: 'linear',
              display: false,
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            /**
             * @description providing autocolors, because there might a lot of data to display on the chart,
             *              hardcoding some colors in here is impossible
             *
             *             Using colors offset, in order to move to next colors set (without offset, the first colors were just too dark),
             *             some of the other offsets are already used in other places, want so variety thus different numbers
             *             are used across different charts
             */
            autocolors: {
              offset: 14, // moves to next colors set (without offset, the colors were just too dark
              customize(context) {
                const lighten = (usedColor, value) => color(usedColor).lighten(value).rgbString();
                return {
                  background: lighten(context.colors.background, 0.25),
                  border: lighten(context.colors.border, 0.25)
                };
              },
              mode: 'data'
            },
            legend: {
              position: 'right',
            },
            /** @description handle showing labels on values */
            datalabels: {
              backgroundColor: function(context) {
                return context.dataset.borderColor;
              },
              borderRadius: 4,
              color: 'white',
              font: {
                weight: 'bold'
              },
              formatter: function(value, context) {
                return `${context.dataset.data[context.dataIndex]}%`;
              },
              padding: 4
            },
            /** @description configuration of tooltips */
            tooltip: {
              animation: false,
              intersect: false,
              callbacks: {
                /**
                 * @description builds the tooltips that are visible when hovering over the points
                 */
                label: function(data) {
                  return data.raw + '%';
                }
              }
            },
          }
        },
      };
    },
  },
  methods: {
    /**
     * @description creates the chart data from backend data
     */
    async buildChartData(): Promise<void> {
      let paymentsPerTypes = await this.$moduleCall.getAll(SymfonyReportsRoutes.PAYMENTS_TOTAL_PER_TYPE_BASE_URL);
      let sumPerType = [];
      let totalSum = 0;

      for (let type in paymentsPerTypes) {
        if (!sumPerType[type]) {
          sumPerType[type] = 0;
        }

        paymentsPerTypes[type].map((entry: Record<string, string | number>) => sumPerType[type] += entry.value)
        totalSum += sumPerType[type];
      }

      for (let type in sumPerType) {
        this.chartData.push({
          value: (sumPerType[type] / totalSum * 100).toFixed(2),
          label: type,
        })
      }

    }
  },
  async mounted(): Promise<void> {
    await this.buildChartData();
    this.createChart(this.chartConfig, this.$refs.chartWrapper);
  }
}
</script>