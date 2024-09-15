<template>
  <Container>
    <SimpleTable :headers="headers"
                 :data="data"
                 ref="table"
                 class="mt-4"
                 v-if="data.length > 0"
    />
    <NoResultsText v-else />
  </Container>
</template>

<script lang="ts">
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";
import Container     from "@/components/Ui/Containers/Container.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      allYears: [],
      yearFilter: null,
      headers: [
        {
          label: this.$t('payments.incomes.table.header.amount.label'),
          dataValuePath : 'amount.value',
          dataIsComponentPath : 'amount.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.incomes.table.header.information.label'),
          dataValuePath : 'information.value',
          dataIsComponentPath : 'information.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.incomes.table.header.date.label'),
          dataValuePath : 'date.value',
          dataIsComponentPath : 'date.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.incomes.table.header.currency.label'),
          dataValuePath : 'currency.value',
          dataIsComponentPath : 'currency.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.incomes.table.header.actions.label'),
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
    SimpleTable,
    Container
  },
}
</script>
