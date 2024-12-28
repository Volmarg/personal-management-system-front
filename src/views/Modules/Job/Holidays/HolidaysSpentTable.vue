<template>

  <div class="flex flex-col justify-end"
       v-if="allYears.length > 0"
  >
    <div>
      <h2 class="text-lg text-center md:text-right pr-0 md:pr-6 mb-1">{{ $t('job.holidays.shared.filter.byYear.header') }}</h2>
    </div>

    <div class="flex flex-col md:flex-row justify-end flex-wrap gap-y-2">
      <MediumButtonWithIcon :text="$t('job.holidays.shared.filter.byYear.button.showAll.label')"
                            @button-click="applyYearFilter(null)"
                            button-classes="w-full md:w-auto flex justify-center md:block"
                            text-classes="text-center"
                            class="w-full md:w-auto mb-1 md:mb-0"
      />

      <MediumButtonWithIcon v-for="year in allYears"
                            button-classes="w-full md:w-auto flex justify-center md:block"
                            text-classes="text-center"
                            class="w-full md:w-auto mb-1 md:mb-0"
                            :key="year"
                            :text="year"
                            @button-click="applyYearFilter(year)"
      />
    </div>
  </div>

  <SimpleTable :headers="headers"
               :data="usedData"
               ref="table"
               class="mt-4"
               v-if="data.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import SimpleTable          from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText        from "@/components/Page/NoResultsText.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      yearFilter: null,
      headers: [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.holidays.tabs.spent.table.headers.year.label'),
          dataValuePath : 'year.value',
          dataIsComponentPath : 'year.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.holidays.tabs.spent.table.headers.daysSpent.label'),
          dataValuePath : 'daysSpent.value',
          dataIsComponentPath : 'daysSpent.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.holidays.tabs.spent.table.headers.information.label'),
          dataValuePath : 'information.value',
          dataIsComponentPath : 'information.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.holidays.tabs.spent.table.headers.actions.label'),
          dataValuePath : "actions.value",
          dataIsComponentPath : "actions.isComponent",
          dataComponentPropertiesPath: "actions.componentProps"
        }
      ],
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    }
  },
  components: {
    MediumButtonWithIcon,
    NoResultsText,
    SimpleTable
  },
  computed: {
    /**
     * @description returns the data that will be used in table
     */
    usedData(): Array {
      let usedData = [];
      for (let dataChunk of this.data) {
        if (this.yearFilter && dataChunk.values.year.value != this.yearFilter) {
          continue;
        }

        usedData.push(dataChunk);
      }

      return usedData;
    },
    /**
     * @description build array of available years
     */
    allYears(): Array {
      let allYears = [];
      for (let rowData of this.data) {
        allYears.push(rowData.values.year.value.match(/[0-9]{4}/)[0]);
      }

      return allYears = [...new Set(allYears)];
    }
  },
  methods: {
    /**
     * @description react to user clicking on year filter, will non-directly filter table data
     */
    applyYearFilter(year: string | null): void {
      this.yearFilter = year;
      this.$refs.table.refresh();
    },
  },
}
</script>
