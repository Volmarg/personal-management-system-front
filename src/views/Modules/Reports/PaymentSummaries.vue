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

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
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
        /**
         * @description dummy data for now
         */
        data: [
          {
            values : {
              monthAndYear : {
                value       : "2023.09",
                isComponent : false,
              },
              money : {
                value       : "96.35",
                isComponent : false,
              },
            }
          },
          {
            values : {
              monthAndYear : {
                value       : "2024.02",
                isComponent : false,
              },
              money : {
                value       : "65.24",
                isComponent : false,
              },
            }
          },
        ]
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
      return this.table.data;
    }
  },
  methods: {

  }
}
</script>
