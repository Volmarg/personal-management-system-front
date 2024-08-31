<template>
  <HolidaysSummaryTable :data="usedTableData"
                        v-if="tableData.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import NoResultsText        from "@/components/Page/NoResultsText.vue";
import HolidaysSummaryTable from "@/views/Modules/Job/Holidays/HolidaysSummaryTable.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {

      tableData: [
        {
          values : {
            year : {
              value       : "2023",
              isComponent : false,
            },
            daysForYear : {
              value       : "23",
              isComponent : false,
            },
            daysSpent : {
              value       : "12",
              isComponent : false,
            },
            daysLeft : {
              value       : "11",
              isComponent : false,
            }
          }
        },
        {
          values : {
            year : {
              value       : "2024",
              isComponent : false,
            },
            daysForYear : {
              value       : "30",
              isComponent : false,
            },
            daysSpent : {
              value       : "18",
              isComponent : false,
            },
            daysLeft : {
              value       : "12",
              isComponent : false,
            }
          }
        },
      ]
    }
  },
  components: {
    HolidaysSummaryTable,
    NoResultsText
  },
  computed: {
    usedTableData(): Array {
      return this.tableData;
    }
  },
}
</script>