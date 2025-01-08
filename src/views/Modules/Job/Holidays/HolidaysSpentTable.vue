<template>

  <div class="flex flex-col justify-end"
       v-if="allYears.length > 0"
  >
    <div>
      <h2 class="text-lg text-center md:text-right pr-0 md:pr-6 mb-1">{{ $t('job.holidays.shared.filter.byYear.header') }}</h2>
    </div>

    <div class="w-full flex justify-end">
      <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/6 md:mr-2">
        <YearSelect :years="allYears"
                    :allow-all-option="true"
                    v-model="yearFilter"
        />
      </div>
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
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";
import YearSelect    from "@/components/Form/YearSelect.vue";

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
    YearSelect,
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
  watch: {
    yearFilter(): void {
      this.$refs.table.refresh();
    },
  },
}
</script>
