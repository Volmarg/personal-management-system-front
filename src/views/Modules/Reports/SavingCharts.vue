<template>
  <Base :info-block-description="$t('reports.saving.eachMonth.description')"
        :is-in-container="true"
        cla
  >

    <div>
      <h2 class="text-2xl mb-1">{{ $t('reports.saving.eachMonth.chart.header') }}</h2>

      <div class="flex flex-col justify-end"
           v-if="this.allYears.length > 0"
      >
        <div>
          <h2 class="text-lg text-center md:text-right pr-0 md:pr-6 mb-1">{{ $t('reports.saving.eachMonth.chart.filter.filterByYear.header') }}</h2>
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
      <Actions :chart-instance="chartInstance" />

      <canvas
          ref="chartWrapper"
          height="100%"
          style="max-height: 400px"
      ></canvas>

      <h2 class="text-lg">{{ $t('reports.saving.eachMonth.chart.text.averageSavingMonth.label') }}: {{ avgSaving }}</h2>
    </div>

  </Base>
</template>

<script lang="ts">
import Base       from "@/views/Modules/Base.vue";
import YearSelect from "@/components/Form/YearSelect.vue";
import Actions    from "@/components/Libs/ChartJs/Actions.vue";

import ChartJsMixin from "@/mixins/Libs/ChartJsMixin.vue";

import {ChartConfiguration} from "chart.js/auto";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyReportsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyReportsRoutes";

export default {
  data(): ComponentData {
    return {
      yearFilter: null,
      allYears: [],
      chartData: [],
    }
  },
  mixins: [
    ChartJsMixin
  ],
  components: {
    YearSelect,
    Actions,
    Base,
  },
  computed: {
    /**
     * @description average saving per month
     */
    avgSaving(): number {
      if (this.values.length === 0) {
        return 0;
      }

      let sum = 0;
      for (let value of this.values) {
        sum += value;
      }

      return (sum / this.values.length).toFixed(2);
    },
    /**
     * @description x axis values
     */
    labels(): Array<string> {
      let labels = this.chartData.map((data: Record<string, string | number>) => {return data.label} );
      if (!this.yearFilter) {
        return labels;
      }

      let filteredLabels = [];
      for (let label of labels) {
        if (label.match(/[0-9]{4}/)[0] == this.yearFilter) {
          filteredLabels.push(label);
        }
      }

      return filteredLabels;
    },
    /**
     * @description y axis values
     */
    values(): Array<string> {
      if (!this.yearFilter) {
        return this.chartData.map((data: Record<string, string | number>) => {return data.value} );
      }

      let filteredValues = [];
      for (let data of this.chartData) {
        if (data.label.match(/[0-9]{4}/)[0] == this.yearFilter) {
          filteredValues.push(data.value)
        }
      }

      return filteredValues;
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
          datasets: [
            {
              borderColor: 'rgb(59, 130, 246)',
              fill: false,
              label: this.$t('reports.saving.eachMonth.chart.tooltip.label'),
              data: this.values,
            }
          ]
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
              backgroundColor: function(context) {
                return context.dataset.borderColor;
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
              animation: false,
              intersect: false,
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
              display: false
            },
          }
        },
      };
    },
  },
  methods: {
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
    this.chartData = await this.$moduleCall.getAll(SymfonyReportsRoutes.SAVINGS_BASE_URL);
    this.buildYears();
    this.createChart(this.chartConfig, this.$refs.chartWrapper);
  }
}
</script>