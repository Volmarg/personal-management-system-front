<template>
  <HolidaysSpentTable :data="usedTableData"
                       v-if="usedTableData.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import NoResultsText      from "@/components/Page/NoResultsText.vue";
import HolidaysSpentTable from "@/views/Modules/Job/Holidays/HolidaysSpentTable.vue";
import AddEditForm        from "@/views/Modules/Job/Holidays/AddEditForm.vue";
import TableActions       from "@/components/Ui/Actions/TableActions.vue";

import SymfonyJobRoutes from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";
import {DaysSpentState} from "@/scripts/Vue/Store/Module/Job/Holidays/DaysSpentState";
import {PoolsState}     from "@/scripts/Vue/Store/Module/Job/Holidays/PoolsState";

export default {
  props: {
    holidays: {
      type: Array,
      require: true,
    },
  },
  components: {
    HolidaysSpentTable,
    NoResultsText
  },
  computed: {
    usedTableData(): Array {
      let data = [];
      for (let holiday of this.holidays) {
        data.push({
          values : {
            id: {
              value: holiday.id,
              isComponent: false,
            },
            year: {
              value: String(holiday.year),
              isComponent: false,
            },
            daysSpent: {
              value: holiday.daysSpent,
              isComponent: false,
            },
            information: {
              value: holiday.information,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyJobRoutes.HOLIDAYS_SPENT_BASE_URL,
                store: [DaysSpentState, PoolsState],
              }
            }
          }
        })
      }
      return data;
    }
  },
}
</script>