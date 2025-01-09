<template>
  <div>
    <h2 class="text-2xl mb-1">{{ $t('reports.paymentCharts.tabs.totalEachMonth.header') }}</h2>

    <div class="flex flex-col justify-end"
         v-if="this.allYears.length > 0"
    >
      <div>
        <h2 class="text-lg text-center md:text-right pr-0 md:pr-6 mb-1">{{ $t('reports.paymentCharts.tabs.totalEachMonth.filter.filterByYear.header') }}</h2>
      </div>

      <div class="w-full flex justify-end">
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/6 md:mr-2">
          <YearSelect :years="allYears"
                      :allow-all-option="true"
                      @update:modelValue="applyYearFilter($event)"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="chart-wrapper lg:p-10 xl:p-20 flex justify-end flex-col">
    <canvas
        ref="chartWrapper"
        height="100%"
        style="max-height: 400px"
    ></canvas>
  </div>
</template>

<script lang="ts">
import YearSelect from "@/components/Form/YearSelect.vue";

import ChartJsMixin from "@/mixins/Libs/ChartJsMixin.vue";

import {ChartConfiguration} from "chart.js/auto";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {ChartDataset} from "chart.js/dist/types";
import {color} from "chart.js/helpers";

import SymfonyReportsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyReportsRoutes";

export default {
  data(): ComponentData {
    return {
      yearFilter: null,
      allYears: [],
      chartData: {},
    }
  },
  mixins: [
    ChartJsMixin
  ],
  components: {
    YearSelect,
  },
  computed: {
    datasets(): Array<ChartDataset> {
      let datasets = [] as Array<ChartDataset>;
      for (let dataType in this.chartData) {
        let data = this.chartData[dataType];
        let dataset: ChartDataset = {
          fill: false,
          label: dataType,
          data: this.getDatasetValues(data),
        }

        datasets.push(dataset)
      }

      return datasets;
    },
    /**
     * @description x axis values, must contain labels from all datasets
     */
    labels(): Array<string> {
      let labels = [];
      for (let dataType in this.chartData) {
        let data = this.chartData[dataType];
        labels = [
          ...labels,
          ...data.map((dataChunk: Record<string, string | number>) => {return dataChunk.label} ),
        ];
      }

      if (!this.yearFilter) {
        return [...new Set(labels)];
      }

      let filteredLabels = [];
      for (let label of labels) {
        if (label.match(/[0-9]{4}/)[0] == this.yearFilter) {
          filteredLabels.push(label);
        }
      }

      return [...new Set(filteredLabels)];
    },
    /**
     * @description configuration of the chart, it's options etc.
     */
    chartConfig(): ChartConfiguration {
      let crosshairColor = 'rgba(5, 150, 105, 0.3)';
      return {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: this.$t('reports.saving.eachMonth.chart.scale.x.label'),
                font: {
                  weight: "bold",
                }
              },
            },
            y: {
              title: {
                display: true,
                text: this.$t('reports.saving.eachMonth.chart.scale.y.label'),
                font: {
                  weight: "bold",
                }
              },
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            /**
             * @description providing autocolors, because there might a lot of data to display on the chart,
             *              hardcoding some colors in here is impossible
             *
             *              Using colors offset, in order to move to next colors set (without offset, the first colors were just too dark),
             *              some of the other offsets are already used in other places, want so variety thus different numbers
             *              are used across different charts
             */
            autocolors: {
              offset: 24,
              customize(context) {
                const lighten = (usedColor, value) => color(usedColor).lighten(value).rgbString();
                return {
                  background: lighten(context.colors.background, 0.25),
                  border: lighten(context.colors.border, 0.25)
                };
              },
              mode: 'data'
            },
            /** @link handle line with data on hover + zoom etc */
            crosshair: {
              sync: {
                enabled: false
              },
              line: {
                color: crosshairColor, // crosshair line color
                width: 1               // crosshair line width
              },
              zoom: {
                enabled: true,                              // enable zooming
                zoomboxBackgroundColor: crosshairColor,     // background color of zoom box
                zoomboxBorderColor: crosshairColor,         // border color of zoom box
                zoomButtonClass: 'chart-reset-zoom',        // reset zoom button class
                zoomButtonText: this.$t('generic.chart.resetButton.label'), // reset zoom button text
              },
            },
            /** @description handle showing labels on values */
            datalabels: {
              backgroundColor: function() {
                return 'rgba(59, 130, 246, 0.6)';
              },
              borderRadius: 4,
              color: 'white',
              font: {
                weight: 'bold'
              },
              formatter: Math.round,
              padding: 4
            },
            /** @description handle showing the title */
            title: {
              display: false,
            },
            /** @description configuration of tooltips */
            tooltip: {
              /** @description with this mode, tooltip contains data from all sets on hover */
              mode: 'index',
              animation: false,
              intersect: false,
              displayColors: false,
              callbacks: {
                /**
                 * @description builds the tooltips that are visible when hovering over the points
                 */
                label: function(data) {
                  return data.chart.data.datasets[data.datasetIndex].label + ": " + data.raw;
                }
              }
            },
            /** @description datasets legend configuration */
            legend: {
              position: "bottom"
            },
          }
        },
      };
    },
  },
  methods: {
    /**
     * @description returns the data values for single dataset pool
     */
    getDatasetValues(data: Array): Array<string> {
      if (!this.yearFilter) {
        return data.map((dataChunk: Record<string, string | number>) => {return dataChunk.value} );
      }

      let filteredValues = [];
      for (let dataChunk of data) {
        if (dataChunk.label.match(/[0-9]{4}/)[0] == this.yearFilter) {
          filteredValues.push(dataChunk.value)
        }
      }

      return filteredValues;
    },
    /**
     * @description react to user clicking on year filter, will non-directly filter labels / values etc.
     */
    applyYearFilter(year: string | null): void {
      this.yearFilter = year;
      this.refreshChart(this.chartConfig, this.$refs.chartWrapper);
    },
    /**
     * @description build array of available years
     */
    buildYears(): void {
      for (let yearMonth of this.labels) {
        this.allYears.push(yearMonth.match(/[0-9]{4}/)[0]);
      }

      this.allYears = [...new Set(this.allYears)];
    }
  },
  async mounted(): Promise<void> {
    this.chartData = await this.$moduleCall.getAll(SymfonyReportsRoutes.PAYMENTS_TOTAL_PER_MONTH_BASE_URL)
    this.buildYears();
    this.createChart(this.chartConfig, this.$refs.chartWrapper);
  }
}
</script>