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
          label: this.$t('payments.bills.overview.elementTable.header.amount.label'),
          dataValuePath : 'amount.value',
          dataIsComponentPath : 'amount.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.bills.overview.elementTable.header.name.label'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.bills.overview.elementTable.header.date.label'),
          dataValuePath : 'date.value',
          dataIsComponentPath : 'date.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.bills.overview.elementTable.header.actions.label'),
          dataValuePath : null,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
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
    NoResultsText,
    SimpleTable
  },
}
</script>
