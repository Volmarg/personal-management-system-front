<template>
  <Base :info-block-description="$t('reports.historical.paymentsSummaries.description')">
    <SimpleTable :headers="table.headers"
                 :data="usedTableData"
    />
  </Base>
</template>

<script lang="ts">
import Base        from "@/views/Modules/Base.vue";
import SimpleTable from "@/components/Ui/Table/SimpleTable.vue";

import {ComponentData}      from "@/scripts/Vue/Types/Components/types";
import SymfonyReportsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyReportsRoutes";
import ArrayTypeProcessor   from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";
import NumberTypeProcessor  from "@/scripts/Core/Services/TypesProcessors/NumberTypeProcessor";

export default {
  data(): ComponentData {
    return {
      paymentsPerTypes: {},
      table: {
        /**
         * @description dummy data for now
         */
        headers: [
          {
            label: this.$t('reports.historical.paymentsSummaries.table.headers.monthAndYear.label'),
            dataValuePath : 'monthAndYear.value',
            dataIsComponentPath : 'monthAdnYear.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('reports.historical.paymentsSummaries.table.headers.money.label'),
            dataValuePath : 'money.value',
            dataIsComponentPath : 'money.isComponent',
            dataComponentPropertiesPath: null
          }
        ],
        data: []
      }
    }
  },
  components: {
    SimpleTable,
    Base,
  },
  computed: {
    /**
     * @description returns used / filtered out table data
     */
    usedTableData(): Array {
      let tableData = [];

      let sumPerMonthAndYear = {};
      for (let type in this.paymentsPerTypes) {
        for (let monthData of this.paymentsPerTypes[type]) {
          if (!sumPerMonthAndYear[monthData.label]) {
            sumPerMonthAndYear[monthData.label] = 0
          }

          sumPerMonthAndYear[monthData.label] += monthData.value;
          sumPerMonthAndYear[monthData.label] = NumberTypeProcessor.toFixed(sumPerMonthAndYear[monthData.label], 2);
        }
      }

      for (let month in sumPerMonthAndYear) {
        tableData.push({
          values: {
            monthAndYear: {
              value: month,
              isComponent: false,
            },
            money: {
              value: sumPerMonthAndYear[month],
              isComponent: false,
            },
          }
        });
      }

      return ArrayTypeProcessor.sortObjects(tableData, "values.monthAndYear.value");
    }
  },
  async beforeMount(): Promise<void> {
    this.paymentsPerTypes = await this.$moduleCall.getAll(SymfonyReportsRoutes.PAYMENTS_TOTAL_PER_TYPE_BASE_URL);
  }
}
</script>
