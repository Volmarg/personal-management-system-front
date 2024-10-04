<template>
  <SimpleTable :headers="tableHeaders"
               :data="tableData"
               ref="table"
               class="mt-4"
               v-if="tableData.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import NoResultsText from "@/components/Page/NoResultsText.vue";
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";


import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      tableHeaders: [
        {
          label: this.$t('goals.payments.tab.manage.table.header.name.label'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.start.label'),
          dataValuePath : 'start.value',
          dataIsComponentPath : 'start.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.end.label'),
          dataValuePath : 'end.value',
          dataIsComponentPath : 'end.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.goal.label'),
          dataValuePath : 'goal.value',
          dataIsComponentPath : 'goal.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.collected.label'),
          dataValuePath : 'collected.value',
          dataIsComponentPath : 'collected.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.showOnDashboard.label'),
          dataValuePath : 'showOnDashboard.value',
          dataIsComponentPath : 'showOnDashboard.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.actions.label'),
          dataValuePath : null,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
      ],
      tableData: [
        {
          values : {
            name : {
              value       : "New laptop",
              isComponent : false,
            },
            start : {
              value       : "2024-09-29",
              isComponent : false,
            },
            end : {
              value       : "2024-10-30",
              isComponent : false,
            },
            goal : {
              value       : "942",
              isComponent : false,
            },
            collected : {
              value       : "2206",
              isComponent : false,
            },
            showOnDashboard : {
              value       : this.$t(`goals.payments.tab.manage.table.header.showOnDashboard.state.${Number(true)}.label`),
              isComponent : false,
            }
          }
        },
        {
          values : {
            name : {
              value       : "Guitar",
              isComponent : false,
            },
            start : {
              value       : "2024-12-11",
              isComponent : false,
            },
            end : {
              value       : "2024-12-26",
              isComponent : false,
            },
            goal : {
              value       : "952",
              isComponent : false,
            },
            collected : {
              value       : "300",
              isComponent : false,
            },
            showOnDashboard : {
              value       : this.$t(`goals.payments.tab.manage.table.header.showOnDashboard.state.${Number(false)}.label`),
              isComponent : false,
            }
          }
        },
      ],
    }
  },
  components: {
    SimpleTable,
    NoResultsText
  },
  computed: {
    usedTableData(): Array {
      return this.tableData;
    }
  },
}
</script>