<template>
  <SimpleTable :headers="headers"
               :data="data"
               ref="table"
               class="mt-4"
               v-if="data.length > 0"
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
      allYears: [],
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
          label: this.$t('payments.bills.management.table.header.name.label'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.bills.management.table.header.information.label'),
          dataValuePath : 'information.value',
          dataIsComponentPath : 'information.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.bills.management.table.header.plannedAmount.label'),
          dataValuePath : 'plannedAmount.value',
          dataIsComponentPath : 'plannedAmount.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.bills.management.table.header.startDate.label'),
          dataValuePath : 'startDate.value',
          dataIsComponentPath : 'startDate.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.bills.management.table.header.endDate.label'),
          dataValuePath : 'endDate.value',
          dataIsComponentPath : 'endDate.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.bills.management.table.header.actions.label'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentPropertiesPath: 'actions.componentProps'
        },
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
    NoResultsText,
    SimpleTable
  },
}
</script>
