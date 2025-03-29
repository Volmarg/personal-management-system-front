<template>
  <HolidaysSummaryTable :data="usedTableData"
                        v-if="usedTableData.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import NoResultsText        from "@/components/Page/NoResultsText.vue";
import HolidaysSummaryTable from "@/views/Modules/Job/Holidays/HolidaysSummaryTable.vue";

import {ComponentData}  from "@/scripts/Vue/Types/Components/types";

import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

export default {
  data(): ComponentData {
    return {
      poolsStore: null,
      daysSpentStore: null,
    }
  },
  components: {
    HolidaysSummaryTable,
    NoResultsText
  },
  props: {
    pools: {
      type: Array,
      require: true,
    },
    holidays: {
      type: Array,
      require: true,
    },
  },
  computed: {
    /**
     * @description returns table data. This might look kinda fishy, but:
     *              - first handling the holidays spent,
     *              - then handling pools without any day spent,
     *
     *              This is necessary. Cannot loop over pools, because it could turn out that pool is removed
     *              and as such summary would no longer show data for that year.
     */
    usedTableData(): Array {
      let data = [];
      let sumSpentPerYear = [];

      for (let holiday of this.holidays) {
        if (!sumSpentPerYear[holiday.year]) {
          sumSpentPerYear[holiday.year] = 0;
        }
        sumSpentPerYear[holiday.year] += holiday.daysSpent;
      }

      for (let year in sumSpentPerYear) {
        let sumSpent = sumSpentPerYear[year];
        let maxForYear = this.pools.find((pool) => pool.year == year)?.days ?? null;

        data.push({
          values: {
            year: {
              value: year,
              isComponent: false,
            },
            daysForYear: {
              value: maxForYear ?? "???",
              isComponent: false,
            },
            daysSpent: {
              value: sumSpent,
              isComponent: false,
            },
            daysLeft: {
              value: (maxForYear ? maxForYear - sumSpent : "???"),
              isComponent: false,
            }
          }
        })
      }

      for (let pool of this.pools) {
        if (Object.keys(sumSpentPerYear).includes(pool.year)) {
          continue;
        }

        data.push({
          values: {
            year: {
              value: pool.year,
              isComponent: false,
            },
            daysForYear: {
              value: pool.days,
              isComponent: false,
            },
            daysSpent: {
              value: 0,
              isComponent: false,
            },
            daysLeft: {
              value: pool.days,
              isComponent: false,
            }
          }
        })
      }

      return ArrayTypeProcessor.sortObjects(data, "values.year.value");
    }
  }
}
</script>