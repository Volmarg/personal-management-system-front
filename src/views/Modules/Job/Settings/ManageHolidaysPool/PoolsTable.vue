<template>
  <SimpleTable :headers="headers"
               :data="tableData"
               ref="table"
               v-if="tableData.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      targetFilter: null,
      targetSelectOptions: [],
      headers: [
        {
          label: this.$t('job.settings.tabs.managePool.table.headers.year.label'),
          dataValuePath : 'year.value',
          dataIsComponentPath : 'year.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.settings.tabs.managePool.table.headers.days.label'),
          dataValuePath : 'days.value',
          dataIsComponentPath : 'days.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.settings.tabs.managePool.table.headers.companyName.label'),
          dataValuePath : 'companyName.value',
          dataIsComponentPath : 'companyName.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.settings.tabs.managePool.table.headers.actions.label'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentPropertiesPath: null
        },
      ],
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    }
  },
  components: {
    NoResultsText,
    SimpleTable
  },
}
</script>
