<template>
  <HolidaysSpentTable :data="usedTableData"
                       v-if="tableData.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import NoResultsText      from "@/components/Page/NoResultsText.vue";
import HolidaysSpentTable from "@/views/Modules/Job/Holidays/HolidaysSpentTable.vue";

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
            daysSpent : {
              value       : "2",
              isComponent : false,
            },
            information : {
              value       : "Fun time",
              isComponent : false,
            }
          }
        },
        {
          values : {
            year : {
              value       : "2023",
              isComponent : false,
            },
            daysSpent : {
              value       : "12",
              isComponent : false,
            },
            information : {
              value       : "Long break!",
              isComponent : false,
            },
          }
        },
      ],
    }
  },
  components: {
    HolidaysSpentTable,
    NoResultsText
  },
  computed: {
    usedTableData(): Array {
      return this.tableData;
    }
  },
}
</script>